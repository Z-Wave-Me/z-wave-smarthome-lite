import { Inject, Injectable, OnDestroy } from '@angular/core';
import { config } from './websocket.token';
import {
  webSocket,
  WebSocketSubject,
  WebSocketSubjectConfig,
} from 'rxjs/webSocket';
import {
  BehaviorSubject,
  MonoTypeOperatorFunction,
  Observable,
  Subscription,
} from 'rxjs';
import { delay, filter, map, retryWhen, share } from 'rxjs/operators';
import {
  WebSocketConfig,
  WsMessage,
} from '@core/services/websocket/websocket.interfaces';

/**
 *  It connects to the server and subscribes to the events
 */

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements OnDestroy {
  private subscription?: Subscription;
  private websocket$: WebSocketSubject<WsMessage<unknown>>;
  private readonly configuration: WebSocketSubjectConfig<WsMessage<unknown>>;
  private readonly connect$ = new BehaviorSubject<boolean>(false);
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
  }

  /**
   * It returns an observable that emits events of type T when the event is received
   * @param {string} event - The event name to listen to.
   * @param subMsg - A function that returns a message to be sent to the server.
   * @param unsubMsg - A function that returns a message to unsubscribe from the event.
   * @returns An observable that emits the data from the websocket.
   */
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
          return data as T;
        }),
        filter((value) => !!value),
        // tap((data) => {
        //   console.group('WS SERVICE LOG [ ', event, ' ]');
        //   console.log(data);
        //   console.groupEnd();
        // }),
        this.reconnect(this.RECONNECT_INTERVAL)
      );
  }

  /**
   * Send a message to the server
   * @param {string} event - The name of the event.
   * @param {T} data - The data to be sent to the server.
   */
  send<T>(event: string, data: T): void {
    this.websocket$.next({ event, data });
  }

  /**
   * Returns an Observable that emits a boolean value that indicates whether the client is connected to the server
   * @returns An Observable of boolean.
   */
  isConnect(): Observable<boolean> {
    return this.connect$.asObservable();
  }

  /**
   * Returns a boolean value that indicates whether the connection is currently active
   * @returns The value of the connect$ stream.
   */
  isConnectSnapshot(): boolean {
    return this.connect$.value;
  }

  /**
   * When the connection status event is emitted, subscribe to it
   */
  connect() {
    this.websocket$.complete();
    this.websocket$ = webSocket<WsMessage<unknown>>(this.configuration);
    this.subscription?.unsubscribe();
    this.subscription = this.on<void>('connectionStatusEvent').subscribe();
  }

  /**
   * It unsubscribes from the subscription and completes the websocket$ and connect$ observables.
   */
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.websocket$.complete();
    this.connect$.complete();
  }

  /**
   * `reconnect` is a function that takes a number and returns a function that takes an observable and returns an
   * observable
   * @param {number} reconnectInterval - The number of milliseconds to wait before reconnecting.
   * @returns A MonoTypeOperatorFunction<T>
   */
  private reconnect<T>(reconnectInterval: number): MonoTypeOperatorFunction<T> {
    return retryWhen((errors) => errors.pipe(delay(reconnectInterval)));
  }
}
