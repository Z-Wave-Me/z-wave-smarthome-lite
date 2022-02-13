import { FilterPredicate } from '@modules/interfaces/pages.interfaces';
import { Order } from '@store/filter/filter.state';
import { OrderByLocations } from '@store/devices/deviceInterface';

export class UpdateFilter {
  static readonly type = '[Filter] Update Filter';
  constructor(public filter: FilterPredicate = {}) {}
}

export class AddFilter {
  static readonly type = '[Filter] Add Filter';
  constructor(public filter: FilterPredicate) {}
}

export class RemoveFilter {
  static readonly type = '[Filter] Remove Filter';
  constructor(public filter: FilterPredicate) {}
}
export class RemoveAllFilters {
  static readonly type = '[Filter] Remove All Filters';
}
export class ToggleHidden {
  static readonly type = '[Filter] Toggle Hidden';
  constructor(public showHidden?: boolean) {}
}

export class SetTagsList {
  static readonly type = '[Filter] Set Tags List';
  constructor(public tagsList: string[] = []) {}
}

export class SetTag {
  static readonly type = '[Filter] Set Tag';
  constructor(public tag?: string) {}
}

export class SetOrder {
  static readonly type = '[Filter] Set Order';
  constructor(
    public place?: OrderByLocations,
    public orderBy?: Order,
    public desc?: boolean,
    public name?: string
  ) {}
}

export class SetAutocomplete {
  static readonly type = '[Filter] Set Autocomplete';
  constructor(public pattern: string, public save: boolean = false) {}
}
