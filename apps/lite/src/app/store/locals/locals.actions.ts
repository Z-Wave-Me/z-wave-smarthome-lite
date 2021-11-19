import { FilterPredicate } from '@modules/interfaces/pages.interfaces';

export class ExtendNav {
  static readonly type = '[Locals] Extend Nav';
  constructor(public extendingNav: string) {}
}

export class ServerStatus {
  static readonly type = '[Locals] Server Status';
  constructor(public serverAvailable: boolean) {}
}

export class ServerTime {
  static readonly type = '[Locals] Server Time';
  constructor(public serverTime: number) {}
}
