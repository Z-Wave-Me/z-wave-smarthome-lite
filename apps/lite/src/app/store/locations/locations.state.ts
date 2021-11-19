import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import {
  ChangeLocation,
  CreateRoom,
  RemoveCustomImg,
  RemoveLocation,
  UpdateLocations,
  UpdateLocations2,
  UploadCustomImg,
} from './locations.action';
import { patch } from '@ngxs/store/operators';
import { Location } from '@store/locations/location';
import { TranslocoService } from '@ngneat/transloco';
import { ConfigService } from '@core/services/config/config.service';
import { ApiService } from '@core/services/api/api.service';
import { map, tap } from 'rxjs/operators';
import { ChangeDevice } from '@store/devices/devices.actions';
import { DevicesStateModel } from '@store/devices/devices.state';

export class LocationsStateModel {
  ids?: number[];
  entities!: { [id: number]: Location };
}

const defaults: LocationsStateModel = {
  entities: {},
};

@State<LocationsStateModel>({
  name: 'locations',
  defaults,
})
@Injectable()
export class LocationsState {
  constructor(
    private readonly translocoService: TranslocoService,
    private readonly configService: ConfigService,
    private readonly apiService: ApiService,
    private readonly store: Store
  ) {}

  @Action(UpdateLocations)
  update(
    { setState }: StateContext<LocationsStateModel>,
    { locations }: UpdateLocations
  ): void {
    const ids: number[] = [];
    const entities: { [id: number]: Location } = {};

    locations
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((location) => {
        if (location.id === 0) {
          location.title = 'Global';
          // this.translocoService.translate('globalRoom');
          // console.log(location.title);
          location.imgSrc = 'assets/img/rooms/unassigned.png';
        } else if (location.img_type === 'default' && location.default_img) {
          location.imgSrc = 'assets/img/rooms/' + location.default_img;
        } else if (location.img_type === 'user' && location.user_img) {
          location.imgSrc =
            this.configService.get('apiUrl') +
            'load/image/' +
            location.user_img;
        } else {
          location.imgSrc = 'assets/img/placeholder-img.png';
        }
        ids.push(location.id);
        entities[location.id] = location;
      });

    setState(
      patch({
        entities: patch(entities),
        ids,
      })
    );
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
      method: 'put',
    });
  }

  @Action(RemoveLocation)
  removeLocation(
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
        this.store.dispatch(new ChangeDevice({ ...el, location: 0 }))
      );
    setState({
      ids: state.ids?.filter((id) => id !== locationId),
      entities: Object.fromEntries(
        Object.entries(state.entities).filter((_, key) => key !== locationId)
      ),
    });
    return this.apiService.send('locations', {
      command: locationId,
      method: 'delete',
    });
  }

  @Action(RemoveCustomImg)
  removeCustomImg(
    { getState }: StateContext<LocationsStateModel>,
    { id }: { id: number }
  ) {
    const toDelete = getState().entities[id].user_img;
    return this.apiService
      .send('locations_image', {
        command: id,
        params: [
          {
            key: 'user_img',
            value: toDelete,
          },
        ],
        method: 'delete',
      })
      .pipe(
        tap(() => {
          this.store.dispatch(
            new ChangeLocation({
              ...getState().entities[id],
              user_img: '',
              img_type: '',
              default_img: '',
            })
          );
        })
      );
  }

  @Action(UploadCustomImg)
  uploadCustomImg(
    { getState }: StateContext<LocationsStateModel>,
    { id, file }: { id: number; file: File }
  ) {
    const toUpload = new FormData();
    toUpload.append('files_files', file);
    return this.apiService
      .send('upload', {
        method: 'post',
        data: toUpload,
      })
      .pipe(
        tap(() => {
          this.store.dispatch(
            new ChangeLocation({
              ...getState().entities[id],
              user_img: file.name,
              default_img: '',
              img_type: 'user',
            })
          );
        })
      );
  }

  @Action(CreateRoom)
  createRoom({ title }: CreateRoom) {
    const room = {
      id: 0,
      title,
      user_img: '',
      default_img: '',
      img_type: 'default',
      main_sensors: [],
    };
    return this.apiService
      .send('locations', {
        method: 'post',
        data: room,
      })
      .pipe(map((e) => this.store.dispatch(new UpdateLocations2())));
  }
  @Action(UpdateLocations2)
  updateLocations2() {
    return this.apiService.send<{ data: Location[] }>('locations').pipe(
      map(({ data: locations }: { data: Location[] }) => {
        this.store.dispatch(new UpdateLocations(locations));
      })
    );
  }
}