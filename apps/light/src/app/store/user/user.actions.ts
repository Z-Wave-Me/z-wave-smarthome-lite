import { User } from '@interfaces/user';

export class SetUser {
  static readonly type = '[User] Set';
  constructor(public payload: User) {}
}

export class RemoveUser {
  static readonly type = '[User] Remove';
}
