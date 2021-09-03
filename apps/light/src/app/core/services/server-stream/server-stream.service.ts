import { Injectable, OnDestroy } from '@angular/core';
import { ApiService, Payload } from '@core/services/api/api.service';
import { exhaustMap, finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject, timer } from 'rxjs';
import { ServerStreamConfig } from '@core/services/server-stream/server-stream-config';
import { DeviceResponseInterface } from '@core/services/server-stream/device-response.interface';
import { UpdateDevices } from '@store/devices/devices.actions';
import { Store } from '@ngxs/store';
import { DeviceInterface } from '@store/devices/deviceInterface';
import { ServerTime } from '@store/locals/locals.actions';
import { Location } from '@store/locations/location';
import { UpdateLocations } from '@store/locations/locations.action';
import { WebsocketService } from '@core/services/websocket/websocket.service';

@Injectable()
export class ServerStreamService implements OnDestroy {
  private readonly connection$: Observable<boolean>;
  private destroy$ = new Subject<void>();

  constructor(
    private readonly apiService: ApiService,
    private webSocketService: WebsocketService,
    private store: Store,
  ) {
    this.connection$ = of(false);
    // this.connection$ = webSocketService.isConnect();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  subscribe(config: ServerStreamConfig): void {
    this.connection$
      .pipe(
        switchMap((isConnect) => {
          console.log('Connection status ', isConnect);
          return isConnect ? this.wsAccess(config) : this.httpAccess(config);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private httpAccess(config: ServerStreamConfig): Observable<void> {
    if (config.api === 'devices') {
      return this.updateDevices(config);
    }
    if (config.api === 'locations') {
      return this.updateLocations(config);
    }
    throw new Error('Unsupported api');
  }

  private wsAccess(config: ServerStreamConfig): Observable<void> {
    // return this.webSocketService.on<void>(config.api).pipe(finalize(() => console.log('Web Socket complete')));
    return this.webSocketService.on('me.z-wave.devices.level');
  }

  private updateDevices({ api, timeBetweenRequests }: ServerStreamConfig): Observable<void> {
    let params: Payload | undefined;
    return timer(0, timeBetweenRequests ?? 3000).pipe(
      exhaustMap(() => this.apiService.send(api, params)),
      map(({ data }: { data: DeviceResponseInterface<DeviceInterface> }) => {
        return data;
      }),
      map(({ updateTime, structureChanged, devices }) => {
        this.store.dispatch(new UpdateDevices({ devices, structureChanged: !params }));
        this.store.dispatch(new ServerTime(updateTime * 1000));
        params = structureChanged ? undefined : { params: [{ key: 'since', value: updateTime }] };
        console.groupEnd();
      }),
      finalize(() => console.log('Http UpdateDevices complete')),
    );
  }

  private updateLocations({ api, timeBetweenRequests }: ServerStreamConfig): Observable<void> {
    return timer(0, timeBetweenRequests ?? 6000).pipe(
      exhaustMap(() => this.apiService.send(api)),
      map(({ data: locations }: { data: Location[] }) => {
        this.store.dispatch(new UpdateLocations({ locations }));
      }),
      finalize(() => console.log('Http UpdateLocations complete')),
    );
  }
}
