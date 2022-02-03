import { Device, Metric } from '@store/devices/deviceInterface';

export class DestroyDevices {
  static readonly type = '[Devices] Destroy';
}

export class UpdateDevices {
  static readonly type = '[Devices] Update';

  constructor(public devices: Device[], public structureChanged = false) {}
}

export class ProgressDevice {
  static readonly type = '[Devices] Progress';

  constructor(public payload: { id: string; inProgress: boolean }) {}
}

export class ChangeLevel {
  static readonly type = '[Devices] Change Level';

  constructor(public payload: { id: string; level: number | string }) {}
}

export class ToggleLevel {
  static readonly type = '[Devices] Toggle Level';
  constructor(public id: string) {}
}

export class ChangeDevice {
  static readonly type = '[Devices] Change Device';

  constructor(public device: Partial<Device> & { id: string }) {}
}

export class UpdateMetrics {
  static readonly type = '[Devices] Change Metric';

  constructor(public metric: Partial<Metric>, public id: string) {}
}
