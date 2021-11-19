import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { MetricsAction } from './metrics.actions';

interface Metric {
  probeTitle?: string;
  scaleTitle?: string;
  title: string;
  icon: string;
  level?: string;
  updateTime: number;
}
export class MetricsStateModel {
  ids!: string[];
  entities!: { [index: string]: Metric };
}

const defaults = {
  ids: [],
  entities: {},
};

@State<MetricsStateModel>({
  name: 'metrics',
  defaults,
})
@Injectable()
export class MetricsState {
  // @Action(MetricsAction)
  // add({ getState, setState }: StateContext<MetricsStateModel>, { payload }: MetricsAction) {
  //   const state = getState();
  //   setState({ items: [ ...state.items, payload ] });
  // }
}
