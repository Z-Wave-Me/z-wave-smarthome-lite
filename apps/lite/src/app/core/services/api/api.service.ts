import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { defer, EMPTY, iif } from 'rxjs';
import { WebsocketService } from '@core/services/websocket/websocket.service';
import { HttpEncapsulatedRequest } from '@core/services/ws-api/http-encapsulated-request';
import { WsMessage } from '@core/services/websocket/websocket.interfaces';

export interface Payload {
  data?: any;
  params?: {
    [param: string]:
      | string
      | number
      | boolean
      | ReadonlyArray<string | number | boolean>;
  };
  command?: string | number;
  method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiList: { [index: string]: string } = {
    upload: '/ZAutomation/api/v1/upload/file',
    add_dsk: '/ZWaveAPI/AddDSKEntry', // Add DSK
    add_dsk_provisioning_list: '/ZWaveAPI/AddDSKProvisioningEntry', // Add DSK to ProvisioningList (Response with added DSK) POST
    app_built_info: 'app/info.json',
    backup: '/ZAutomation/api/v1/backup',
    cloudbackup: 'CloudBackupAPI/Backup',
    configget_url: '/ZWaveAPI/ExpertConfigGet',
    configupdate_url: '/ZWaveAPI/ExpertConfigUpdate',
    customicon: '/ZAutomation/api/v1/devices',
    devices: '/ZAutomation/api/v1/devices',
    enable_smart_start: 'JS/Run/zway.SmartStartEnable()', // enable SmartStart
    factory_default: '/ZAutomation/api/v1/resetToFactoryDefault',
    firmwareupdate: '/ZAutomation/api/v1/system/webif-access',
    firstAccess: '/ZAutomation/api/v1/system/first-access',
    get_dsk: '/ZWaveAPI/GetDSKCollection', // Get DSK collection
    get_dsk_provisioning_list: '/ZWaveAPI/GetDSKProvisioningList', // Show ProvisioningList (includes only DSKs)
    get_pulse_trains: 'RF433API/GetPulseTrains',
    hide_devices: '/ZAutomation/api/v1/hidedevices',
    history_delete: 'HistoryAPI/Delete',
    history_get: 'HistoryAPI/Get',
    icons: '/ZAutomation/api/v1/icons',
    icons_install: '/ZAutomation/api/v1/icons/install',
    icons_upload: '/ZAutomation/api/v1/icons/upload',
    instances: '/ZAutomation/api/v1/instances',
    ip_address: '/ZAutomation/api/v1/system/ip-address',
    locations: '/ZAutomation/api/v1/locations',
    locations_image: '/ZAutomation/api/v1/locations/image', // delete cutom room image // TODO: add backend,
    login: '/ZAutomation/api/v1/login',
    logout: '/ZAutomation/api/v1/logout',
    mobile_app_support: 'MobileAppSupportAPI/app', // MobileAppSupport,
    modules: '/ZAutomation/api/v1/modules',
    modules_categories: '/ZAutomation/api/v1/modules/categories',
    modules_transform: '/ZAutomation/api/v1/modules/transform',
    namespaces: '/ZAutomation/api/v1/namespaces',
    notification_channels: '/ZAutomation/api/v1/notificationChannels', // get NotificationFiltering channels for the user
    notification_filtering: '/ZAutomation/api/v1/notificationFiltering', // get and set NotificationFiltering settings app for a user
    notifications: '/ZAutomation/api/v1/notifications',
    oauth2: '/ZAutomation/api/v1/oauth2',
    online_delete: '/ZAutomation/api/v1/modules/delete',
    online_install: '/ZAutomation/api/v1/modules/install',
    online_reset: '/ZAutomation/api/v1/modules/reset',
    online_update: '/ZAutomation/api/v1/modules/update',
    password_reset: '/ZAutomation/api/v1/auth/forgotten',
    ping: '/ZAutomation/api/v1/system/time/get',
    postfix: '/ZWaveAPI/Postfix',
    profiles: '/ZAutomation/api/v1/profiles',
    profiles_auth_update: '/ZAutomation/api/v1/auth/update',
    remote_id: '/ZAutomation/api/v1/system/remote-id',
    remove_dsk: '/ZWaveAPI/RemoveDSKEntry?id=', // Remove DSK
    remove_dsk_collection: 'JS/Run/saveObject("zwaydskCollection",null)', // Remove DSK collection
    reorder: '/ZAutomation/api/v1/devices/reorder',
    restore: '/ZAutomation/api/v1/restore',
    send_pulse_train: 'RF433API/Send',
    session: '/ZAutomation/api/v1/session',
    skins: '/ZAutomation/api/v1/skins',
    skins_active: '/ZAutomation/api/v1/skins/active',
    skins_install: '/ZAutomation/api/v1/skins/install',
    skins_reset: '/ZAutomation/api/v1/skins/setToDefault',
    skins_update: '/ZAutomation/api/v1/skins/update',
    system_info: '/ZAutomation/api/v1/system/info',
    system_reboot: '/ZAutomation/api/v1/system/reboot',
    time: '/ZAutomation/api/v1/system/time/get',
    time_zone: '/ZAutomation/api/v1/system/timezone',
    tokens: '/ZAutomation/api/v1/modules/tokens',
    trust_my_network: '/ZAutomation/api/v1/system/trust-my-network',
    update_device_database: '/ZAutomation/api/v1/system/zwave/deviceInfoUpdate',
    update_dsk: '/ZWaveAPI/UpdateDSKEntry', // Update DSK
    update_zwave_vendors: '/ZAutomation/api/v1/system/zwave/vendorsInfoUpdate',
    wifi_cli: '/ZAutomation/api/v1/system/wifiCli/settings', // WifiCli settings,
    wifi_cli_connection_type: '/ZAutomation/api/v1/system/connectionType',
    zwave_devices: '/ZAutomation/api/v1/system/zwave/deviceInfoGet',
    zwave_vendors: '/ZAutomation/api/v1/system/zwave/vendorsInfoGet',
  };
  private remoteApiList = {
    // JamesBox request
    jamesbox_request:
      'https://storage.z-wave.me/zbu_ui_handling.php?action=request',
    // JamesBox update
    jamesbox_update:
      'https://storage.z-wave.me/zbu_ui_handling.php?action=update',
    // JamesBox update info
    jamesbox_updateinfo:
      'https://storage.z-wave.me/zbu_ui_handling.php?action=updateinfo',
    // JamesBox cancel update
    jamesbox_cancel_update:
      'https://storage.z-wave.me/zbu_ui_handling.php?action=cancelupdate',
    // RSS feed
    rss_feed: 'https://service.z-wave.me/rssFeed/index.php',
  };

  constructor(
    private http: HttpClient,
    private readonly websocketService: WebsocketService
  ) {}

  /**
   * If the websocket is connected, send the request over the websocket. Otherwise, send the request over the http
   * @param {string} event - The name of the event to send.
   * @param {Payload} [payload] - The payload object that contains the data to send to the server.
   * @param [withResponse=false] - If true, the response will be returned as a promise.
   * @returns A Promise<T>
   */
  send<T>(event: string, payload?: Payload, withResponse = false) {
    const url = this.apiList[event];
    if (!url) {
      throw new Error('Bad Api event ' + event);
    }
    const params = new HttpParams().appendAll(payload?.params ?? {});
    const command = payload?.command ? '/' + payload.command : '';
    return iif(
      () => this.websocketService.isConnectSnapshot(),
      defer(() =>
        iif(
          () => withResponse,
          defer(() =>
            this.wsSendWithResponse<T>(
              url + command + (payload?.params ? '?' + params.toString() : ''),
              payload?.method,
              payload?.data
            )
          ),
          defer(() =>
            this.wsSend(
              url + command + (payload?.params ? '?' + params.toString() : ''),
              payload?.method,
              payload?.data
            )
          )
        )
      ),
      defer(() =>
        this.httpSend<T>(url + command, payload?.method, params, payload?.data)
      )
    );
  }

  /**
   * It sends a request to the server, and returns the response
   * @param {string} url - The URL to send the request to.
   * @param {'GET' | 'PUT' | 'POST' | 'DELETE'} [method=GET] - The HTTP method to use.
   * @param {HttpParams} params - HttpParams,
   * @param {any} data - The data to be sent to the server.
   * @returns The observable of the HTTP request.
   */
  private httpSend<T>(
    url: string,
    method: 'GET' | 'PUT' | 'POST' | 'DELETE' = 'GET',
    params: HttpParams,
    data: any
  ) {
    // console.warn(url + command + params, payload?.data, command, params);
    if (method === 'PUT') {
      return this.http.put<T>(url, data, {
        params,
      });
    }
    if (method === 'DELETE') {
      return this.http.delete<T>(url, { params });
    }
    if (data || method === 'POST') {
      return this.http.post<T>(url, data, {
        params,
      });
    }
    return this.http.get<T>(url, {
      params,
    });
  }

  /**
   * Send a request to the server
   * @param {string} url - The URL to send the request to.
   * @param {'GET' | 'PUT' | 'POST' | 'DELETE'} [method=GET] - The HTTP method to use.
   * @param {any} [body] - The body of the request.
   * @returns Nothing.
   */
  private wsSend(
    url: string,
    method: 'GET' | 'PUT' | 'POST' | 'DELETE' = 'GET',
    body?: any
  ) {
    this.websocketService.send('httpEncapsulatedRequest', {
      url,
      method,
      body,
    });
    return EMPTY;
  }

  /**
   * It sends a message to the websocket server, and returns a promise that resolves to the response from the server
   * @param {string} url - The URL to send the request to.
   * @param {'GET' | 'PUT' | 'POST' | 'DELETE'} [method=GET] - The HTTP method to use.
   * @param {never} [body] - The body of the request.
   * @returns A promise that resolves to the response.
   */
  private wsSendWithResponse<T>(
    url: string,
    method: 'GET' | 'PUT' | 'POST' | 'DELETE' = 'GET',
    body?: never
  ) {
    const event = Date.now().toString();
    return this.websocketService.on<T>(
      event,
      (): WsMessage<HttpEncapsulatedRequest> => ({
        event: 'httpEncapsulatedRequest',
        data: {
          url,
          method,
          body,
        },
        responseEvent: event,
      })
    );
  }
}
