import { Location } from '@store/locations/location';

export class DestroyLocations {
  static readonly type = '[Locations] Destroy';
}

export class UpdateLocations {
  static readonly type = '[Locations] Update';
  constructor(public payload: { locations: Location[] }) {}
}
