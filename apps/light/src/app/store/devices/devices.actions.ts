import { DeviceResponseInterface } from '@core/services/server-stream/device-response.interface';
import { DeviceInterface } from '@store/devices/deviceInterface';
import { FilterPredicate } from '@modules/interfaces/pages.interfaces';

export class DestroyDevices {
  static readonly type = '[Devices] Destroy';
}

export class UpdateDevices {
  static readonly type = '[Devices] Update';
  constructor(public payload: Pick<DeviceResponseInterface<DeviceInterface>, 'devices' | 'structureChanged'>) {}
}

export class ProgressDevice {
  static readonly type = '[Devices] Progress';
  constructor(public payload: { id: string; inProgress: boolean }) {}
}
