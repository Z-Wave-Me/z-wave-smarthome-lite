import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import {
  ChangeLocation,
  RemoveLocation,
  UpdateLocations,
} from './locations.action';
import { patch } from '@ngxs/store/operators';
import { Location } from '@store/locations/location';
import { TranslocoService } from '@ngneat/transloco';
import { ConfigService } from '@core/services/config/config.service';
import { ApiService } from '@core/services/api/api.service';

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
    private readonly apiService: ApiService
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
}
