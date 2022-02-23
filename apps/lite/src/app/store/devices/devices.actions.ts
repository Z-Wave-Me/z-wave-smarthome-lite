import { Device } from '@store/devices/deviceInterface';

export class DestroyDevices {
  static readonly type = '[Devices] Destroy';

  constructor(public deviceId: string) {}
}

// export class UpdateDevicesOLD {
//   static readonly type = '[Devices] Update OLD';
//
//   constructor(public devices: Device[], public structureChanged = false) {}
// }

export class UpdateDevices {
  static readonly type = '[Devices] Update Devices';

  constructor(public devices: Device[], public structureChanged = false) {}
}

/**
 * It sends a request to the API to get all devices.
 * @returns The `UpdateDevices` action.
 */
export class UpdateAllDevices {
  static readonly type = '[Devices] Update All Devices';
}

// export class SetDevices {
//   static readonly type = '[Devices] Set Device';
//   constructor(public devices: Device[]) {}
// }

export class ChangeDevice {
  static readonly type = '[Devices] Change Device';

  constructor(
    public device: (Partial<Device> & { id: string }) | string,
    public serverUpdate = false
  ) {}
}

export class ProgressDevice {
  static readonly type = '[Devices] Progress';

  constructor(public payload: { id: string; inProgress: boolean }) {}
}

/**
 * Send a command to a device.
 * @param  - id: The id of the device to change the level of.
 * @returns Nothing.
 */
export class ChangeLevel {
  static readonly type = '[Devices] Change Level';

  constructor(public payload: { id: string; level: number | string }) {}
}

export class ToggleLevel {
  static readonly type = '[Devices] Toggle Level';

  constructor(public id: string) {}
}

// export class ChangeDevices {
//   static readonly type = '[Devices] Change Devices';
//   constructor(public device: Partial<Device> & { id: string }) {}
// }

// export class SetDevice {
//   static readonly type = '[Devices] Set Device';
//   constructor(public device: Partial<Device> & { id: string }) {}
// }
