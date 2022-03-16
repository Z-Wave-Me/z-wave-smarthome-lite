import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import {
  ServerStatus,
  ServerTime,
  SetServerDateOptions,
  StorePosition,
} from './locals.actions';
import { patch } from '@ngxs/store/operators';

export class LocalsStateModel {
  serverAvailable!: boolean;
  serverTime!: number;
  scrollPosition!: Record<string, number>;
  localGMT!: string;
}
export interface IServerDateOptions {
  localGMT: string;
  localTimeString: string;
  localTimeUT: number;
  localTimeZone: string;
  localTimeZoneOffset: number;
}

const defaults = {
  serverAvailable: true,
  serverTime: 0,
  scrollPosition: {},
  localGMT: '',
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
  static localGMT({ localGMT }: LocalsStateModel): string {
    return localGMT;
  }

  static position(route: string) {
    return createSelector(
      [LocalsState],
      ({ scrollPosition }) => scrollPosition?.[route] ?? 0
    );
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
    setState(patch({ serverTime: serverTime }));
  }

  @Action(StorePosition)
  storePosition(
    { setState, getState }: StateContext<LocalsStateModel>,
    { route, position }: StorePosition
  ) {
    const scrollPosition = { ...getState().scrollPosition, [route]: position };
    setState(
      patch({
        scrollPosition,
      })
    );
  }
  @Action(SetServerDateOptions)
  setDateOptions(
    { setState }: StateContext<LocalsStateModel>,
    { options }: SetServerDateOptions
  ) {
    setState(
      patch({
        localGMT: options.localGMT,
      })
    );
  }
}
