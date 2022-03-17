import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import {
  ChangeDevice,
  ChangeLevel,
  DestroyDevices,
  ProgressDevice,
  ToggleLevel,
  UpdateAllDevices,
  UpdateDevices,
} from './devices.actions';
import { patch } from '@ngxs/store/operators';
import { IconSupplierService } from '@core/services/icon-supplier/icon-supplier.service';
import {
  FilterState,
  FilterStateModel,
  Order,
} from '@store/filter/filter.state';
import { SetTagsList } from '@store/filter/filter.actions';
import { concat, EMPTY, of } from 'rxjs';
import { ServerTime } from '@store/locals/locals.actions';
import { ApiService } from '@core/services/api/api.service';
import { Device, OrderByLocations } from '@store/devices/deviceInterface';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { filter, map } from 'rxjs/operators';

const orderFactory =
  (order: Order, place: OrderByLocations, descending: boolean = false) =>
  (a: Device, b: Device): number => {
    const sign = descending ? -1 : 1;
    let delta;
    switch (order) {
      case 'elements':
        delta = sign * (a.order[place] - b.order[place]);
        if (delta) return sign * (a.order[place] - b.order[place]);
        else return sign * a.id.localeCompare(b.id);
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
    private readonly store: Store,
    private readonly apiService: ApiService
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
      showBattery,
      tag,
      orderBy: { order, desc, place },
      search,
    }: FilterStateModel
  ): string[] {
    const orderBy = orderFactory(order, place, desc);
    return Object.values(entities)
      .filter((entre) => {
        if (!showBattery && entre.deviceType === 'battery') return false;
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
  ) {
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

  static getDeviceById(id: string) {
    return createSelector(
      [DevicesState],
      ({ entities }: DevicesStateModel) => entities[id]
    );
  }

  // static deviceField(id: string, field: string) {
  //   return createSelector(
  //     [DevicesState],
  //     ({ entities }: DevicesStateModel) => entities[id][field]
  //   );
  // }

  @Selector()
  static tagsList({ entities }: DevicesStateModel): string[] {
    return [
      ...new Set<string>(
        Object.values(entities)
          .map((device) => device.tags)
          .flat()
      ),
    ];
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

  @Action(ChangeLevel)
  changeLevel(
    { getState }: StateContext<DevicesStateModel>,
    {
      payload: { id, level },
    }: { payload: { id: string; level: number | string } }
  ) {
    const device = getState().entities[id];
    this.store.dispatch(
      new ChangeDevice({ ...device, metrics: { ...device.metrics, level } })
    );
    if (typeof level === 'number') {
      return this.apiService.send('devices', {
        command: id + '/command/exact',
        params: { level },
      });
    }
    return this.apiService.send('devices', {
      command: id + '/command/' + level,
    });
  }

  @Action(ToggleLevel)
  toggleLevel(ctx: StateContext<DevicesStateModel>, { id }: { id: string }) {
    const device = ctx.getState().entities[id];
    let level;
    if (device.deviceType === 'switchMultilevel') {
      level = device.metrics.level > 0 ? 0 : 99;
    }
    if (device.deviceType === 'switchBinary') {
      level = device.metrics.level === 'on' ? 'off' : 'on';
    }
    if (level !== undefined)
      return this.store.dispatch(new ChangeLevel({ id, level }));
    return of(void 0);
  }

  @Action(DestroyDevices)
  destroyDevices(
    { getState }: StateContext<DevicesStateModel>,
    { deviceId }: { deviceId: string }
  ) {
    console.log(deviceId);
  }

  @Action(ChangeDevice)
  changeDevice(
    { getState }: StateContext<DevicesStateModel>,
    { device, serverUpdate }: ChangeDevice
  ) {
    if (typeof device === 'string') {
      this.store.dispatch(new DestroyDevices(device));
      if (serverUpdate) {
        return this.updateServer(device);
      }
    } else {
      const old = getState().entities[device.id];
      const updated = [
        { ...old, ...device, metrics: { ...old?.metrics, ...device?.metrics } },
      ];
      this.store.dispatch(new UpdateDevices(updated));
      if (serverUpdate) {
        return this.updateServer(updated);
      }
    }
    return EMPTY;
  }

  updateServer(devices: Device[] | string) {
    if (Array.isArray(devices)) {
      return concat(
        ...devices.map((device) =>
          this.apiService.send(
            'devices',
            {
              command: device.id,
              method: 'PUT',
              data: {
                location: device.location ?? 0,
                metrics: {
                  title: device.title,
                  icon: device.metrics.icon,
                  level: device.metrics.level,
                },
                permanently_hidden: false,
                tags: device.tags,
                visibility: device.visibility ?? !device.hidden,
              },
            },
            { withResponse: true }
          )
        )
      );
    }
    return EMPTY;
  }

  @Action(UpdateDevices)
  updateDevice(
    { getState, setState }: StateContext<DevicesStateModel>,
    { devices, structureChanged }: UpdateDevices
  ): void {
    const ids: string[] = [];
    const entities: { [index: string]: Device } = {};
    let locationChanges = false;
    const dashboard =
      this.store.selectSnapshot(LocalStorageState.profile)?.dashboard ?? [];
    let tagsList = new Set<string>();
    let serverTime = 0;
    devices
      .filter((device) => !device.permanently_hidden)
      .map((device: Device) => {
        ids.push(device.id);
        if (serverTime < device.updateTime) {
          serverTime = device.updateTime;
        }
        const additional = {
          iconPath: this.iconSupplier.assignElementIcon(device),
          iconType: device.metrics.icon,
          title: device.metrics.title,
          inProgress: false,
          onDashboard: dashboard.includes(device.id),
          intChartUrl: device.metrics.intchartUrl,
          hasHistory: device.hasHistory, // TODO something wrong here
          showNotification: !device.hasHistory, // TODO something wrong here
          hideEvents: device.hide_events,
        };
        if (device.tags?.length) {
          tagsList = new Set<string>([...tagsList, ...device.tags]);
        }
        if (!locationChanges) {
          locationChanges = !getState().locations[device.location]?.includes(
            device.id
          );
        }

        entities[device.id] = { ...device, ...additional } as Device;
      });
    // this.store.dispatch(new ServerTime(serverTime * 1_000));
    this.store.dispatch(new SetTagsList([...tagsList]));
    let locations;
    if (structureChanged || locationChanges) {
      locations = Object.values(getState().entities).reduce((acc, cur) => {
        if (!acc[cur.location]) {
          acc[cur.location] = [];
        }
        acc[cur.location].push(cur.id);
        return acc;
      }, {} as { [id: number]: string[] });
    }
    if (structureChanged) {
      setState(patch({ ids, entities, locations }));
    } else {
      if (locationChanges) {
        setState(
          patch({
            locations,
          })
        );
      }
      Object.entries(entities).map(([id, el]) =>
        setState(
          patch({
            entities: patch({
              [id]: el,
            }),
          })
        )
      );
    }
  }

  /**
   * It sends a request to the API to get all devices.
   * @returns The `UpdateDevices` action.
   */
  @Action(UpdateAllDevices)
  updateAllDevices() {
    return this.apiService
      .send<{ data: { devices: Device[] } }>('devices', undefined, {
        withResponse: true,
      })
      .pipe(
        filter((data) => !!data.data),
        map(({ data: { devices } }) => {
          this.store.dispatch(new UpdateDevices(devices));
        })
      );
  }
}
