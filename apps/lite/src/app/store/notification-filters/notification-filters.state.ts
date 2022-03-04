import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  ResetFilters,
  SetTimeFilters,
  SetTypeAndSourceFilters,
} from './notification-filters.actions';

export class NotificationFiltersStateModel {
  sourceOrType!: string;
  startTime!: number;
  endTime!: number;
}

const defaults = {
  startTime: 0,
  endTime: 0,
  sourceOrType: '',
};

@State<NotificationFiltersStateModel>({
  name: 'notificationFilters',
  defaults,
})
@Injectable()
export class NotificationFiltersState {
  @Selector()
  static timeFilter({ startTime, endTime }: NotificationFiltersStateModel) {
    return { startTime, endTime };
  }

  @Selector()
  static typeFilter({ sourceOrType }: NotificationFiltersStateModel) {
    return sourceOrType;
  }

  @Action(SetTypeAndSourceFilters)
  setFilter(
    { setState }: StateContext<NotificationFiltersStateModel>,
    { sourceOrType }: SetTypeAndSourceFilters
  ) {
    setState({ ...defaults, sourceOrType });
  }

  @Action(ResetFilters)
  resetFilters({ setState }: StateContext<NotificationFiltersStateModel>) {
    setState(defaults);
  }

  @Action(SetTimeFilters)
  setTimeFilters(
    { setState }: StateContext<NotificationFiltersStateModel>,
    { startTime, endTime }: SetTimeFilters
  ) {
    setState({
      ...defaults,
      startTime,
      endTime,
    });
  }
}
