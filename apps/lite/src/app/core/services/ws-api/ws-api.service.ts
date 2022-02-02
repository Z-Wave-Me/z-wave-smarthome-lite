import { Injectable } from '@angular/core';
import { WebsocketService } from '@core/services/websocket/websocket.service';
import { apiList, baseApiUrl } from '@core/services/ws-api/api-list';
import { PayloadInterface } from '@core/services/ws-api/payload.interface';
import { HttpEncapsulatedRequest } from '@core/services/ws-api/http-encapsulated-request';

@Injectable({
  providedIn: 'root',
})
export class WsApiService {
  private static readonly baseUrl = baseApiUrl;
  private static readonly apiList = apiList;
  constructor(private readonly websocketService: WebsocketService) {}
  send(api: keyof typeof apiList, payload?: PayloadInterface): void {
    const params = payload?.params
      ? '?' +
        payload.params.map(({ key, value }) => key + '=' + value).join('&')
      : '';
    const command = payload?.command ? '/' + payload.command : '';
    this.websocketService.send<HttpEncapsulatedRequest>(
      'httpEncapsulatedRequest',
      {
        body: payload?.data,
        method: payload?.method ?? 'GET',
        url:
          WsApiService.baseUrl + WsApiService.apiList[api] + command + params,
      }
    );
  }
}
