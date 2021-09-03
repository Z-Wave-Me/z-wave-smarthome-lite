export type Role =
  | 'admin'
  | 'admin_user'
  | 'apps'
  | 'appsLocal'
  | 'appsOnline'
  | 'customize'
  | 'module'
  | 'devices'
  | 'myAccess'
  | 'expertView'
  | 'remoteAccess'
  | 'devicesInclude'
  | 'rooms'
  | 'element'
  | 'eventDelete'
  | 'configRooms'
  | 'configRoomsId'
  | 'network'
  | 'networkConfigId'
  | 'logout'
  | 'automation';
export const config: { [role in Role]: number[] } = {
  admin: [1],
  admin_user: [1],
  apps: [1],
  appsLocal: [1],
  appsOnline: [1],
  customize: [1],
  module: [1],
  devices: [1, 2, 3],
  myAccess: [1, 2, 3],
  expertView: [1],
  remoteAccess: [1],
  devicesInclude: [1],
  rooms: [1, 2, 3, 4],
  element: [1, 2, 3, 4],
  eventDelete: [1],
  configRooms: [1],
  configRoomsId: [1],
  network: [1, 3],
  networkConfigId: [1],
  logout: [1, 2, 3, 4],
  automation: [1],
};
