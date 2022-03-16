import { IServerDateOptions } from '@store/locals/locals.state';

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

export class StorePosition {
  static readonly type = '[Locals] Store Position';
  constructor(public route: string, public position: number) {}
}

export class SetServerDateOptions {
  static readonly type = '[Locals] Set Server Date Options';
  constructor(public options: IServerDateOptions) {}
}
