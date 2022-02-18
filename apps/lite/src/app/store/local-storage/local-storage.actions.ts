import { IProfile } from '@store/local-storage/local-storage.state';

export class Login {
  static readonly type = '[LocalStorage] Login';
  constructor(public id: number) {}
}

export class Logout {
  static readonly type = '[LocalStorage] Logout';
}

export class UpdateProfile {
  static readonly type = '[LocalStorage] Update Profile';
}

export class SetProfile {
  static readonly type = '[LocalStorage] Set Profile';
  constructor(public profile: Partial<IProfile>) {}
}
export class NightMode {
  static readonly type = '[LocalStorage] Change Theme';
  constructor(public nightMode: boolean) {}
}

export class SetUser {
  static readonly type = '[LocalStorage] Set User';
  constructor(public profile: IProfile) {}
}

export class SetServerInfo {
  static readonly type = '[LocalStorage] Set Server Info';
  constructor(public remoteId: number, public ipAddress: string) {}
}
