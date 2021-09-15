import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import { ProgressDevice, UpdateDevices } from './devices.actions';
import { patch } from '@ngxs/store/operators';
import { IconSupplierService } from '@core/services/icon-supplier/icon-supplier.service';
import { MenuItem } from '../../components-old/elements/element-sub-menu/element-sub-menu-filter-by-type/element-sub-menu-filter-by-type.component';
import {
  FilterState,
  FilterStateModel,
  Order,
} from '@store/filter/filter.state';
import { SetTagsList } from '@store/filter/filter.actions';

const orderFactory =
  (order: Order, place: OrderByLocations, decs: boolean = false) =>
  (a: Device, b: Device): number => {
    const sign = decs ? -1 : 1;
    switch (order) {
      case 'elements':
        return sign * (a.order[place] - b.order[place]);
      case 'creationTime':
        return sign * (a.creationTime - b.creationTime);
      case 'title':
        return sign * a.title.localeCompare(b.title);
      case 'updateTime':
        return sign * (a.updateTime - b.updateTime);
      default:
        return 0;
    }
  };

interface Metric {
  [index: string]: string | number;
  level: number | string;
  icon: string;
}
export type OrderByLocations = 'rooms' | 'elements' | 'dashboard';
export interface Device {
  deviceType: string;
  inProgress?: boolean;
  visibility: boolean;
  tags: string[];
  creationTime: number;
  updateTime: number;
  title: string;
  creatorId: number;
  intChartUrl?: string;
  hasHistory?: boolean;
  showNotification?: boolean;
  onDashboard: boolean;
  id: string;
  iconPath: string;
  metrics: Metric;
  order: {
    [key in OrderByLocations]: number;
  };
  [key: string]: any;
}

export class DevicesStateModel {
  ids?: string[];
  entities!: { [index: string]: Device };
  locations!: { [id: number]: string[] };
}

const defaults: DevicesStateModel = {
  ids: undefined,
  entities: {},
  locations: {},
};

@State<DevicesStateModel>({
  name: 'devices',
  defaults,
})
@Injectable()
export class DevicesState {
  constructor(
    private readonly iconSupplier: IconSupplierService,
    private readonly store: Store
  ) {}

  @Selector()
  static ids(state: DevicesStateModel): string[] | undefined {
    return state.ids;
  }

  @Selector([FilterState])
  static autocomplete(
    { entities }: DevicesStateModel,
    { showHidden, autocomplete }: FilterStateModel
  ): string[] {
    return Object.values(entities)
      .filter((entre) => {
        if (!showHidden && !entre.visibility) {
          return false;
        }
        if (autocomplete) {
          return entre.title.toLowerCase().includes(autocomplete.toLowerCase());
        } else {
          return false;
        }
      })
      .filter((_, index) => index < 7)
      .map((device) => device.id);
  }

  @Selector([FilterState])
  static showDevice(
    { entities }: DevicesStateModel,
    {
      filter,
      showHidden,
      tag,
      orderBy: { order, desc, place },
      search,
    }: FilterStateModel
  ): string[] {
    const orderBy = orderFactory(order, place, desc);
    return Object.values(entities)
      .filter((entre) => {
        if (!showHidden && !entre.visibility) {
          return false;
        }
        if (search) {
          return entre.title.toLowerCase().includes(search.toLowerCase());
        }
        if (tag && entre) {
          return entre.tags.includes(tag);
        }

        return Object.entries(filter).every(([key, predicate]) => {
          if (Array.isArray(predicate)) {
            return predicate.length
              ? predicate.some((predict) => entre[key] === predict)
              : true;
          }
          return entre[key] === predicate;
        });
      })
      .sort(orderBy)
      .map((device) => device.id);
  }

  @Selector([FilterState])
  static devicesTypeAndCount(
    { entities }: DevicesStateModel,
    { showHidden }: FilterStateModel
  ): Pick<MenuItem, 'type' | 'count'>[] {
    return [
      ...Object.values(entities)
        .filter((entity) => (showHidden ? true : entity.visibility))
        .reduce((acc, { deviceType }) => {
          acc.set(deviceType, (acc.get(deviceType) ?? 0) + 1);
          return acc;
        }, new Map<string, number>()),
    ].map(([type, count]) => {
      return {
        type,
        count,
      };
    });
  }

  static device(id: string, field: string): any {
    return createSelector([DevicesState], ({ entities }: DevicesStateModel) => {
      return entities[id][field];
    });
  }

  @Selector()
  static tagsList({ entities }: DevicesStateModel): string[] {
    return [
      ...new Set<string>(
        Object.values(entities).reduce((acc, cur) => {
          return [...acc, ...cur.tags];
        }, Array<string>())
      ),
    ];
  }

  @Action(UpdateDevices)
  update(
    { setState }: StateContext<DevicesStateModel>,
    {
      payload: { devices, structureChanged },
    }: { payload: { devices: []; structureChanged: boolean } }
  ): void {
    const ids: string[] = [];
    const entities: { [index: string]: any } = {};
    const locations: { [id: number]: string[] } = {};
    const dashboard = this.store.selectSnapshot(
      (state) => state.localStorage.dashboard
    );
    let tagsList = new Set<string>();
    devices.map((device: Device) => {
      ids.push(device.id);
      const additional = {
        iconPath: this.iconSupplier.assignElementIcon(device),
        title: device.metrics.title,
        inProgress: false,
        onDashboard: dashboard.includes(device.id),
        intChartUrl: device.metrics.intchartUrl,
        hasHistory: device.hasHistory, // TODO something wrong here
        showNotification: !device.hasHistory, // TODO something wrong here
      };
      if (device.tags.length) {
        tagsList = new Set<string>([...tagsList, ...device.tags]);
      }
      // TODO need hide hidden devices
      locations[device.location] = locations[device.location] ?? [];
      locations[device.location].push(device.id);
      entities[device.id] = { ...device, ...additional };
    });

    this.store.dispatch(new SetTagsList([...tagsList]));
    if (structureChanged) {
      setState(patch({ ids, entities, locations }));
    } else {
      setState(
        patch({
          entities: patch({ ...entities }),
        })
      );
    }
  }

  @Action(ProgressDevice)
  progress(
    { setState }: StateContext<DevicesStateModel>,
    { payload: { id, inProgress } }: ProgressDevice
  ): void {
    setState(
      patch({
        entities: patch({
          [id]: patch({
            inProgress,
          }),
        }),
      })
    );
  }
}
