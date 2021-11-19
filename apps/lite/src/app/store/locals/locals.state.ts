import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ServerStatus, ServerTime } from './locals.actions';
import { patch } from '@ngxs/store/operators';

export class LocalsStateModel {
  serverAvailable!: boolean;
  serverTime!: number;
}

const defaults = {
  serverAvailable: true,
  serverTime: 0,
};

@State<LocalsStateModel>({
  name: 'locals',
  defaults,
})
@Injectable()
export class LocalsState {
  @Selector()
  static serverAvailable({ serverAvailable }: LocalsStateModel): boolean {
    return serverAvailable;
  }

  @Selector()
  static serverTime({ serverTime }: LocalsStateModel): number {
    return serverTime;
  }

  @Action(ServerStatus)
  setServerStatus(
    { setState }: StateContext<LocalsStateModel>,
    { serverAvailable }: ServerStatus
  ): void {
    setState(patch({ serverAvailable }));
  }

  @Action(ServerTime)
  setServerTime(
    { setState }: StateContext<LocalsStateModel>,
    { serverTime }: ServerTime
  ): void {
    setState(patch({ serverTime: serverTime * 1_000 }));
  }
}
