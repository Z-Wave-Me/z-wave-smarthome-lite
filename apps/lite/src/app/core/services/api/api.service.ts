import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Payload {
  data?: any;
  params?: { key: string; value: string | number }[];
  command?: string | number;
  method?: 'get' | 'put' | 'post' | 'delete';
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
    firstaccess: '/ZAutomation/api/v1/system/first-access',
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

  constructor(private http: HttpClient) {}

  send<T>(event: string, payload?: Payload): Observable<T> {
    const url = this.apiList[event];
    if (!url) {
      throw new Error('Bad Api event ' + event);
    }
    // TODO: make it normally
    const params = payload?.params
      ? '?' +
        payload.params.map(({ key, value }) => key + '=' + value).join('&')
      : '';
    const command = payload?.command ? '/' + payload.command : '';
    // console.warn(url + command + params, payload?.data, command, params);
    if (payload?.method === 'put') {
      return this.http.put<T>(url + command + params, payload?.data);
    }
    if (payload?.method === 'delete') {
      return this.http.delete<T>(url + command + params);
    }
    if (payload?.data || payload?.method === 'post') {
      return this.http.post<T>(url + command + params, payload?.data);
    }
    return this.http.get<T>(url + command + params);
  }
}
