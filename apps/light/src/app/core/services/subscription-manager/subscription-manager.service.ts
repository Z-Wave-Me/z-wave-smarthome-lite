import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from '@core/services/websocket/websocket.service';
import { apiList, baseApiUrl } from '@core/services/ws-api/api-list';
import { Subject } from 'rxjs';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'any',
})
export class SubscriptionManagerService implements OnDestroy {
  private static readonly apiList = apiList;
  private static readonly baseApiUrl = baseApiUrl;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly webSocketService: WebsocketService,
    private readonly store: Store
  ) {
    // webSocketService
    //   .on<{ body: string }>('ws-reply')
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     map((data) => {
    //       console.log('>', data);
    //       try {
    //         return JSON.parse(data.body).data;
    //       } catch (e) {
    //         console.error('ws-reply Error parse', e);
    //       }
    //     }),
    //     tap((response) => {
    //       if ('devices' in response) {
    //         this.store.dispatch(new UpdateDevices(response));
    //       }
    //       console.log(response);
    //     })
    //   )
    //   .subscribe();
    // console.log('started');
    // webSocketService
    //   .on<DeviceInterface>(
    //     'me.z-wave.devices.level',
    //     (): WsMessage<HttpEncapsulatedRequest> => ({
    //       event: 'httpEncapsulatedRequest',
    //       data: {
    //         url:
    //           SubscriptionManagerService.baseApiUrl +
    //           SubscriptionManagerService.apiList['devices'],
    //         method: 'GET',
    //       },
    //     })
    //   )
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     tap((device) =>
    //       this.store.dispatch(
    //         new UpdateDevices({ devices: [device], structureChanged: false })
    //       )
    //     )
    //   )
    //   .subscribe(console.log);
    // this.websocketService.on({});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
