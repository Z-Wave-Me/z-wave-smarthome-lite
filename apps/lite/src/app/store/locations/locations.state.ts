import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  ChangeLocation,
  CreateRoom,
  RemoveCustomImg,
  RemoveLocation,
  UpdateAllLocations,
  UpdateLocations,
  UploadCustomImg,
} from './locations.action';
import { patch } from '@ngxs/store/operators';
import { Location } from '@store/locations/location';
import { TranslocoService } from '@ngneat/transloco';
import { ApiService } from '@core/services/api/api.service';
import { map } from 'rxjs/operators';
import { DevicesStateModel } from '@store/devices/devices.state';
import { ChangeDevice, UpdateAllDevices } from '@store/devices/devices.actions';

export class LocationsStateModel {
  ids!: number[];
  entities!: { [id: number]: Location };
}

const defaults: LocationsStateModel = {
  entities: {},
  ids: [],
};

@State<LocationsStateModel>({
  name: 'locations',
  defaults,
})
@Injectable()
export class LocationsState {
  @Selector()
  static ids({ ids }: LocationsStateModel) {
    return ids;
  }
  constructor(
    private readonly translocoService: TranslocoService,
    private readonly apiService: ApiService,
    private readonly store: Store
  ) {}
  @Selector()
  static locations({ entities }: LocationsStateModel) {
    return entities;
  }
  @Action(UpdateLocations)
  update(
    state: StateContext<LocationsStateModel>,
    { locations, reset }: UpdateLocations
  ): void {
    const ids = reset ? new Set() : new Set(state.getState().ids);
    const entities: { [id: number]: Location } = {};
    if (typeof locations === 'number') {
      this.removeLocationFromStore(state, { locationId: locations });
    } else {
      [locations]
        .flat()
        // .sort((a, b) => a.title.localeCompare(b.title))
        .map((location) => {
          if (location.id === 0) {
            location.title = 'Global';
            // this.translocoService.translate('globalRoom');
            // console.log(location.title);
            location.imgSrc = './assets/img/rooms/unassigned.jpg';
          } else if (location.img_type === 'default' && location.default_img) {
            location.imgSrc = './assets/img/rooms/' + location.default_img;
          } else if (location.img_type === 'user' && location.user_img) {
            location.imgSrc =
              '/ZAutomation/api/v1/load/image/' + location.user_img;
          } else {
            location.imgSrc = 'assets/img/placeholder-img.png';
          }
          ids.add(location.id);
          entities[location.id] = location;
        });
      state.setState(
        patch({
          entities: patch(entities),
          ids: [...ids].sort((a, b) => {
            if (a === 0) a = -Infinity;
            if (b === 0) b = -Infinity;
            return +(b as number) - +(a as number);
          }),
        })
      );
    }
  }

  @Action(ChangeLocation)
  changeLocation(
    { setState }: StateContext<LocationsStateModel>,
    { location }: ChangeLocation
  ) {
    setState(
      patch({
        entities: patch({
          [location.id]: location,
        }),
      })
    );

    return this.apiService.send('locations', {
      command: location.id,
      data: location,
      method: 'PUT',
    });
  }

  @Action(RemoveLocation)
  removeLocation(
    state: StateContext<LocationsStateModel>,
    { locationId }: RemoveLocation
  ) {
    this.removeLocationFromStore(state, { locationId });
    return this.apiService.send('locations', {
      command: locationId,
      method: 'DELETE',
    });
  }

  @Action(RemoveCustomImg)
  removeCustomImg(
    { getState }: StateContext<LocationsStateModel>,
    { id }: { id: number }
  ) {
    const toDelete = getState().entities[id].user_img;
    this.store.dispatch(
      new ChangeLocation({
        ...getState().entities[id],
        user_img: '',
        img_type: '',
        default_img: '',
      })
    );
    return this.apiService.send('locations_image', {
      command: id,
      params: {
        user_img: toDelete,
      },
      method: 'DELETE',
    });
  }

  @Action(UploadCustomImg)
  uploadCustomImg(
    { getState }: StateContext<LocationsStateModel>,
    { id, file }: { id: number; file: File }
  ) {
    const toUpload = new FormData();
    toUpload.append('files_files', file);
    this.store.dispatch(
      new ChangeLocation({
        ...getState().entities[id],
        user_img: file.name,
        default_img: '',
        img_type: 'user',
      })
    );
    console.log(file, 'send file');
    return this.apiService.send(
      'upload',
      {
        method: 'POST',
        data: toUpload,
      },
      {
        useHttp: true,
      }
    );
  }

  @Action(CreateRoom)
  createRoom(
    context: StateContext<LocationsStateModel>,
    { title }: CreateRoom
  ) {
    const room = {
      id: 0,
      title,
      user_img: '',
      default_img: '',
      img_type: 'default',
      main_sensors: [],
    };
    return this.apiService.send('locations', {
      method: 'POST',
      data: room,
    });
    // .pipe(map(() => this.store.dispatch(new UpdateLocations2())));
  }

  @Action(UpdateAllLocations)
  updateAllLocations() {
    return this.apiService
      .send<Location[]>('locations', undefined, { withResponse: true })
      .pipe(
        map((locations) => {
          this.store.dispatch(new UpdateLocations(locations, true));
          this.store.dispatch(new UpdateAllDevices());
        })
      );
  }

  private removeLocationFromStore(
    { getState, setState }: StateContext<LocationsStateModel>,
    { locationId }: RemoveLocation
  ) {
    const state = getState();
    this.store
      .selectSnapshot(({ devices }: { devices: DevicesStateModel }) =>
        Object.values(devices.entities)
      )
      .filter((el) => el.location === locationId)
      .map((el) =>
        this.store.dispatch(new ChangeDevice({ ...el, location: 0 }, true))
      );
    setState({
      ids: state.ids?.filter((id) => id !== locationId),
      entities: Object.fromEntries(
        Object.entries(state.entities).filter((_, key) => key !== locationId)
      ),
    });
  }
}
