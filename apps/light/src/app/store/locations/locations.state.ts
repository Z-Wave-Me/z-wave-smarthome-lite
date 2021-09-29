import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import {
  ChangeLocation,
  RemoveCustomImg,
  RemoveLocation,
  UpdateLocations,
  UploadCustomImg,
} from './locations.action';
import { patch } from '@ngxs/store/operators';
import { Location } from '@store/locations/location';
import { TranslocoService } from '@ngneat/transloco';
import { ConfigService } from '@core/services/config/config.service';
import { ApiService } from '@core/services/api/api.service';
import { tap } from 'rxjs/operators';

export class LocationsStateModel {
  ids!: number[];
  entities!: { [id: number]: Location };
}

const defaults: LocationsStateModel = {
  ids: [],
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
    { payload: { locations } }: { payload: { locations: Location[] } }
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
    { location }: { location: Location }
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
    { locationId }: { locationId: number }
  ) {
    const state = getState();
    setState({
      ids: state.ids.filter((id) => id !== locationId),
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
    // const reader = new FileReader();
    // reader.onload = () => {
    //   setState(
    //     patch({
    //       entities: patch({
    //         [id]: patch({
    //           user_img: reader.result as string,
    //           img_type: 'user',
    //         }),
    //       }),
    //     })
    //   );
    // };
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
}
