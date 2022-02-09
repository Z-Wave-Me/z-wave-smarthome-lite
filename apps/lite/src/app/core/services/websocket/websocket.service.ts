import { Inject, Injectable } from '@angular/core';
import { config } from './websocket.token';
import {
  webSocket,
  WebSocketSubject,
  WebSocketSubjectConfig,
} from 'rxjs/webSocket';
import {
  EMPTY,
  MonoTypeOperatorFunction,
  Observable,
  ReplaySubject,
  startWith,
} from 'rxjs';
import { delay, map, retryWhen, share, takeUntil } from 'rxjs/operators';
import {
  WebSocketConfig,
  WsMessage,
} from '@core/services/websocket/websocket.interfaces';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private static readonly baseEvent = 'me.z-wave.';

  private readonly websocket$: WebSocketSubject<WsMessage<unknown>>;
  private readonly configuration: WebSocketSubjectConfig<WsMessage<unknown>>;
  private readonly connect$ = new ReplaySubject<boolean>(1);
  private RECONNECT_INTERVAL = 3_000;

  constructor(@Inject(config) private readonly wsConfig: WebSocketConfig) {
    this.configuration = {
      openObserver: {
        next: () => this.connect$.next(true),
      },
      closeObserver: {
        next: () => this.connect$.next(false),
      },
      url: this.wsConfig.url,
    };
    this.websocket$ = webSocket<WsMessage<unknown>>(this.configuration);
    this.on<void>('connectionStatusEvent')
      // .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  on<T>(
    event: string,
    subMsg: () => unknown = () => null,
    unsubMsg: () => unknown = () => null
  ): Observable<T> {
    return this.websocket$
      .multiplex(
        subMsg,
        unsubMsg,
        (value) => !!(value.type ?? value.event)?.startsWith(event)
      )
      .pipe(
        share(),
        map((value) => {
          const data = value?.data;
          if ((data as { body: string }).body) {
            return JSON.parse((data as { body: string }).body).data as T;
          }
          // console.log(
          //   '--------------------------------->' +
          //     JSON.stringify(data) +
          //     '<------------------------------------'
          // );
          return data as T;
        }),
        this.reconnect(this.RECONNECT_INTERVAL)
      );
  }

  send<T>(event: string, data: T): void {
    this.websocket$.next({ event, data });
  }

  isConnect(): Observable<boolean> {
    return this.connect$.asObservable().pipe(startWith(false));
  }

  private reconnect<T>(reconnectInterval: number): MonoTypeOperatorFunction<T> {
    return retryWhen((errors) => errors.pipe(delay(reconnectInterval)));
  }
}
