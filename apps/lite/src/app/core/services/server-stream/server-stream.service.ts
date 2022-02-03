import { Injectable, OnDestroy } from '@angular/core';
import { ApiService, Payload } from '@core/services/api/api.service';
import {
  catchError,
  delay,
  exhaustMap,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { EMPTY, Observable, Subject, timer } from 'rxjs';
import { ServerStreamConfig } from '@core/services/server-stream/server-stream-config';
import { DeviceResponseInterface } from '@core/services/server-stream/device-response.interface';
import { UpdateDevices } from '@store/devices/devices.actions';
import { Store } from '@ngxs/store';
import { ServerTime } from '@store/locals/locals.actions';
import { Location } from '@store/locations/location';
import { UpdateLocations } from '@store/locations/locations.action';
import { WebsocketService } from '@core/services/websocket/websocket.service';
import { WsMessage } from '@core/services/websocket/websocket.interfaces';
import { HttpEncapsulatedRequest } from '@core/services/ws-api/http-encapsulated-request';
import { apiList, baseApiUrl } from '@core/services/ws-api/api-list';
import { Device } from '@store/devices/deviceInterface';
import { UpdateProfile } from '@store/local-storage/local-storage.actions';

@Injectable({
  providedIn: 'any',
})
export class ServerStreamService implements OnDestroy {
  private static readonly apiList = apiList;
  private static readonly baseApiUrl = baseApiUrl;
  private readonly connection$: Observable<boolean>;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly apiService: ApiService,
    private readonly webSocketService: WebsocketService,
    private readonly store: Store
  ) {
    // this.connection$ = of(false).pipe(delay(200));
    this.connection$ = webSocketService.isConnect();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  subscribe(config: ServerStreamConfig): void {
    this.connection$
      .pipe(
        switchMap((isConnect) => {
          // console.log('Connection status ', isConnect);
          return isConnect ? this.wsAccess(config) : this.httpAccess(config);
        }),
        takeUntil(this.destroy$)
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
    return EMPTY;
  }

  private wsAccess(config: ServerStreamConfig) {
    if (config.api === 'devices') {
      return this.subscribeDevices();
    }
    if (config.api === 'locations') {
      return this.subscribeLocations();
    }
    if (config.api === 'profile') {
      return this.subscribeProfile();
    }
    return EMPTY;
  }

  private subscribeDevices() {
    return this.webSocketService
      .on<Device | { devices: Device[]; structureChanged: boolean }>(
        'me.z-wave.devices',
        (): WsMessage<HttpEncapsulatedRequest> => ({
          event: 'httpEncapsulatedRequest',
          data: {
            url:
              ServerStreamService.baseApiUrl +
              ServerStreamService.apiList['devices'],
            method: 'GET',
          },
          responseEvent: 'me.z-wave.devices',
        })
      )
      .pipe(
        takeUntil(this.destroy$),
        tap((device) => {
          if ('structureChanged' in device) {
            this.store.dispatch(
              new UpdateDevices(device.devices, device.structureChanged)
            );
          } else {
            this.store.dispatch(new UpdateDevices([device]));
          }
        })
      );
  }

  private subscribeLocations() {
    return this.webSocketService
      .on<Location[] | Location>(
        'me.z-wave.locations',
        (): WsMessage<HttpEncapsulatedRequest> => ({
          event: 'httpEncapsulatedRequest',
          data: {
            url:
              ServerStreamService.baseApiUrl +
              ServerStreamService.apiList['locations'],
            method: 'GET',
          },
          responseEvent: 'me.z-wave.locations',
        })
      )
      .pipe(
        takeUntil(this.destroy$),
        tap((location) => {
          console.log(location);
          if (Array.isArray(location))
            this.store.dispatch(new UpdateLocations(location));
        })
      );
  }

  private updateDevices({
    api,
    timeBetweenRequests,
  }: ServerStreamConfig): Observable<void> {
    let params: Payload | undefined;
    return timer(0, timeBetweenRequests ?? 3000).pipe(
      exhaustMap(() =>
        this.apiService.send<{
          data: DeviceResponseInterface<Device>;
        }>(api, params)
      ),
      map(({ data }: { data: DeviceResponseInterface<Device> }) => {
        return data;
      }),
      map(({ updateTime, structureChanged, devices }) => {
        this.store.dispatch(new UpdateDevices(devices, !params));
        this.store.dispatch(new ServerTime(updateTime));
        params = structureChanged
          ? undefined
          : { params: [{ key: 'since', value: updateTime }] };
        console.groupEnd();
      }),
      // finalize(() => console.log('Http UpdateDevices complete')),
      catchError((err, caches) => {
        console.log('updateDevices', JSON.stringify(err));
        return caches.pipe(delay(1000));
      })
    );
  }

  private updateLocations({
    api,
    timeBetweenRequests,
  }: ServerStreamConfig): Observable<void> {
    return timer(0, timeBetweenRequests ?? 6000).pipe(
      exhaustMap(() => this.apiService.send<{ data: Location[] }>(api)),
      map(({ data: locations }: { data: Location[] }) => {
        this.store.dispatch(new UpdateLocations(locations));
      }),
      // finalize(() => console.log('Http UpdateLocations complete')),
      catchError((err, caches) => {
        console.log('updateLocations', JSON.stringify(err));
        return caches.pipe(delay(1000));
      })
    );
  }

  private subscribeProfile() {
    return this.webSocketService.on<any>('me.z-wave.profile').pipe(
      takeUntil(this.destroy$),
      tap((profile) => {
        // console.log(profile);
        this.store.dispatch(new UpdateProfile());
      })
    );
  }
}
