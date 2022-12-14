import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { config } from './websocket.token';
import { WebsocketService } from './websocket.service';
import { WebSocketConfig } from './websocket.interfaces';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [WebsocketService],
})
export class WebsocketModule {
  /**
   * It returns a ModuleWithProviders object.
   * @param {WebSocketConfig} wsConfig - WebSocketConfig
   * @returns The module with the providers.
   */
  public static config(wsConfig: WebSocketConfig): ModuleWithProviders<any> {
    return {
      ngModule: WebsocketModule,
      providers: [{ provide: config, useValue: wsConfig }],
    };
  }
}
