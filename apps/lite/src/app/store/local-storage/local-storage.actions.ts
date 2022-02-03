export class Login {
  static readonly type = '[LocalStorage] Login';
  constructor(public payload: { login: string; password: string }) {}
}

export class Logout {
  static readonly type = '[LocalStorage] Logout';
}

export class UpdateProfile {
  static readonly type = '[LocalStorage] Update Profile';
}

export class SetProfile {
  static readonly type = '[LocalStorage] Set Profile';
  constructor(public profile: any) {}
}
export class NightMode {
  static readonly type = '[LocalStorage] Change Theme';
  constructor(public nightMode: boolean) {}
}
