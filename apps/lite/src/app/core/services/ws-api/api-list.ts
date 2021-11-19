export const baseApiUrl = '/ZAutomation/api/v1/';
export const apiList = {
  // add_dsk: '/ZWaveAPI/AddDSKEntry', // Add DSK
  // add_dsk_provisioning_list: '/ZWaveAPI/AddDSKProvisioningEntry', // Add DSK to ProvisioningList (Response with added DSK) POST
  // app_built_info: 'app/info.json',
  backup: 'backup',
  // cloudbackup: 'CloudBackupAPI/Backup',
  // configget_url: '/ZWaveAPI/ExpertConfigGet',
  // configupdate_url: '/ZWaveAPI/ExpertConfigUpdate',
  customicon: 'devices',
  devices: 'devices',
  // enable_smart_start: 'JS/Run/zway.SmartStartEnable()', // enable SmartStart
  factory_default: 'resetToFactoryDefault',
  firmwareupdate: 'system/webif-access',
  firstaccess: 'system/first-access',
  // get_dsk: '/ZWaveAPI/GetDSKCollection', // Get DSK collection
  // get_dsk_provisioning_list: '/ZWaveAPI/GetDSKProvisioningList', // Show ProvisioningList (includes only DSKs)
  // get_pulse_trains: 'RF433API/GetPulseTrains',
  hide_devices: 'hidedevices',
  // history_delete: 'HistoryAPI/Delete',
  // history_get: 'HistoryAPI/Get',
  icons: 'icons',
  icons_install: 'icons/install',
  icons_upload: 'icons/upload',
  instances: 'instances',
  ip_address: 'system/ip-address',
  locations: 'locations',
  locations_image: 'locations/image', // delete cutom room image // TODO: add backend,
  login: 'login',
  logout: 'logout',
  // mobile_app_support: 'MobileAppSupportAPI/app', // MobileAppSupport,
  modules: 'modules',
  modules_categories: 'modules/categories',
  modules_transform: 'modules/transform',
  namespaces: 'namespaces',
  notification_channels: 'notificationChannels', // get NotificationFiltering channels for the user
  notification_filtering: 'notificationFiltering', // get and set NotificationFiltering settings app for a user
  notifications: 'notifications',
  oauth2: 'oauth2',
  online_delete: 'modules/delete',
  online_install: 'modules/install',
  online_reset: 'modules/reset',
  online_update: 'modules/update',
  password_reset: 'auth/forgotten',
  ping: 'system/time/get',
  // postfix: '/ZWaveAPI/Postfix',
  profiles: 'profiles',
  profiles_auth_update: 'auth/update',
  remote_id: 'system/remote-id',
  // remove_dsk: '/ZWaveAPI/RemoveDSKEntry?id=', // Remove DSK
  // remove_dsk_collection: 'JS/Run/saveObject("zwaydskCollection",null)', // Remove DSK collection
  reorder: 'devices/reorder',
  restore: 'restore',
  // send_pulse_train: 'RF433API/Send',
  session: 'session',
  skins: 'skins',
  skins_active: 'skins/active',
  skins_install: 'skins/install',
  skins_reset: 'skins/setToDefault',
  skins_update: 'skins/update',
  system_info: 'system/info',
  system_reboot: 'system/reboot',
  time: 'system/time/get',
  time_zone: 'system/timezone',
  tokens: 'modules/tokens',
  trust_my_network: 'system/trust-my-network',
  update_device_database: 'system/zwave/deviceInfoUpdate',
  // update_dsk: '/ZWaveAPI/UpdateDSKEntry', // Update DSK
  update_zwave_vendors: 'system/zwave/vendorsInfoUpdate',
  wifi_cli: 'system/wifiCli/settings', // WifiCli settings,
  wifi_cli_connection_type: 'system/connectionType',
  zwave_devices: 'system/zwave/deviceInfoGet',
  zwave_vendors: 'system/zwave/vendorsInfoGet',
};