export interface DeviceResponseInterface<T> {
  structureChanged: boolean;
  updateTime: number;
  devices: T[];
}
