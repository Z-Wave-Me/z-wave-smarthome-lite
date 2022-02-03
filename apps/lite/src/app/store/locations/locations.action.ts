import { Location } from '@store/locations/location';

export class DestroyLocations {
  static readonly type = '[Locations] Destroy';
}

export class UpdateLocations {
  static readonly type = '[Locations] Update';
  constructor(public locations: Location[] | Location | number) {}
}
export class UpdateLocations2 {
  static readonly type = '[Locations] Update2';
  constructor() {}
}

export class RemoveLocation {
  static readonly type = '[Locations] Remove Location';
  constructor(public locationId: number) {}
}

export class ChangeLocation {
  static readonly type = '[Locations] Change Location';
  constructor(public location: Location) {}
}

export class RemoveCustomImg {
  static readonly type = '[Locations] Remove Custom Img';
  constructor(public id: number) {}
}

export class UploadCustomImg {
  static readonly type = '[Locations] Upload Custom Img';
  constructor(public id: number, public file: File) {}
}

export class CreateRoom {
  static readonly type = '[Locations] Create Room';
  constructor(public title: string) {}
}
