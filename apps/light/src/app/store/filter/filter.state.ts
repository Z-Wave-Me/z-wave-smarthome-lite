import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FilterPredicate } from '@modules/interfaces/pages.interfaces';
import { append, patch, removeItem } from '@ngxs/store/operators';
import {
  AddFilter,
  RemoveFilter,
  SetAutocomplete,
  SetOrder,
  SetTag,
  ToggleHidden,
  UpdateFilter,
} from '@store/filter/filter.actions';
import { OrderByLocations } from '@store/devices/deviceInterface';

export type Order = 'updateTime' | 'creationTime' | 'title' | 'elements';

export interface OrderBy {
  order: Order;
  desc: boolean;
  place: OrderByLocations;
  name: string;
}

const defaultOrder: Omit<OrderBy, 'place'> = {
  name: 'orderElements',
  order: 'elements',
  desc: false,
};

export class FilterStateModel {
  filter!: FilterPredicate;
  tag?: string;
  showHidden!: boolean;
  orderBy!: OrderBy;
  tagsList?: string[];
  search?: string;
  autocomplete?: string;
}

const defaults: FilterStateModel = {
  filter: {
    deviceType: [],
  },
  showHidden: false,
  tagsList: [],
  orderBy: {
    name: 'orderElements',
    order: 'elements',
    desc: false,
    place: 'dashboard',
  },
};

@State<FilterStateModel>({
  name: 'filter',
  defaults,
})
@Injectable()
export class FilterState {
  @Selector()
  static activeFilters({ filter }: FilterStateModel): boolean {
    return !(
      Object.keys(filter).length <= 1 &&
      (!filter.deviceType || filter.deviceType.length === 0)
    );
  }

  @Action(UpdateFilter)
  updateFilter(
    { setState }: StateContext<FilterStateModel>,
    { filter }: UpdateFilter
  ): void {
    setState(patch({ filter }));
  }

  @Action(AddFilter)
  addFilter(
    { setState, patchState }: StateContext<FilterStateModel>,
    { filter: addedFilter }: AddFilter
  ): void {
    patchState({ tag: undefined, search: undefined });
    Object.entries(addedFilter).map(([key, newFilter]) => {
      setState(
        patch({
          filter: patch({
            [key]: append(newFilter),
          }),
        })
      );
    });
  }

  @Action(RemoveFilter)
  removeFilter(
    { setState, getState }: StateContext<FilterStateModel>,
    { filter: filterToRemove }: RemoveFilter
  ): void {
    const filter = getState().filter;
    Object.entries(filterToRemove).map(([key, filterToRemoveList]) => {
      if (Array.isArray(filter[key])) {
        setState(
          patch({
            filter: patch({
              [key]: removeItem<string>((name) =>
                filterToRemoveList.includes(name)
              ),
            }),
          })
        );
      }
    });
  }

  @Action(ToggleHidden)
  toggleHidden(
    { patchState, getState }: StateContext<FilterStateModel>,
    { showHidden }: ToggleHidden
  ): void {
    patchState({ showHidden: showHidden ?? !getState().showHidden });
  }

  @Action(SetTag)
  setTag({ setState }: StateContext<FilterStateModel>, { tag }: SetTag): void {
    setState(
      patch({
        tag,
        search: '',
      })
    );
    if (tag) {
      setState(
        patch({
          filter: { deviceType: [] } as FilterPredicate,
          search: '',
        })
      );
    }
  }

  @Action(SetOrder)
  setOrder(
    { setState }: StateContext<FilterStateModel>,
    { place, orderBy: order, desc, name }: SetOrder
  ): void {
    if (order) {
      setState(
        patch({
          orderBy: {
            order,
            desc,
            place,
            name,
          },
        })
      );
    } else {
      setState(
        patch({
          orderBy: { ...defaultOrder, place },
        })
      );
    }
  }

  @Action(SetAutocomplete)
  setAutocomplete(
    { patchState, setState }: StateContext<FilterStateModel>,
    { pattern, save }: SetAutocomplete
  ): void {
    patchState({ autocomplete: pattern });
    if (save) {
      setState(
        patch({
          filter: { deviceType: [] } as FilterPredicate,
          search: pattern,
          tag: '',
        })
      );
    }
  }
}
