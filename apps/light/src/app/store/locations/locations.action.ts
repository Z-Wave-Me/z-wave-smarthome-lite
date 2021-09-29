import { Location } from '@store/locations/location';

export class DestroyLocations {
  static readonly type = '[Locations] Destroy';
}

export class UpdateLocations {
  static readonly type = '[Locations] Update';
  constructor(public payload: { locations: Location[] }) {}
}

export class RemoveLocation {
  static readonly type = '[Locations] Remove Location';
  constructor(public locationId: number) {}
}

export class ChangeLocation {
  static readonly type = '[Locations] Change Location';
  constructor(public location: Location) {}
}
