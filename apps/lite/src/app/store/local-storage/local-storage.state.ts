import { Inject, Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import { Pages, ShowOptions } from '@modules/interfaces/pages.interfaces';
import { map, tap } from 'rxjs/operators';
import { ApiService } from '@core/services/api/api.service';
import {
  Login,
  Logout,
  NightMode,
  SetProfile,
  SetServerInfo,
  SetUser,
  UpdateProfile,
} from '@store/local-storage/local-storage.actions';
import { TranslocoService } from '@ngneat/transloco';
import { ChangeDevice, UpdateAllDevices } from '@store/devices/devices.actions';
import { patch } from '@ngxs/store/operators';
import { HttpClient } from '@angular/common/http';
import { UpdateAllLocations } from '@store/locations/locations.action';
import { WINDOW } from '@ng-web-apis/common';
import { SetNotificationsFilters } from '@store/notifications/notifications.actions';
import { ResetFilters } from '@store/notification-filters/notification-filters.actions';
import { CookieService } from 'ngx-cookie-service';

export interface ZWayResponse<T> {
  code: number;
  data: T;
  error: string | null;
  message: string;
}

export interface IProfile {
  id: number;
  beta?: boolean;
  dashboard: string[];
  email?: string;
  expertView?: boolean;
  hideAllDeviceEvents?: boolean;
  hideSingleDeviceEvents: string[];
  hideSystemEvents?: boolean;
  interval?: number;
  // login: string;
  role: number;
  name?: string;
  nightMode: boolean;
  rooms?: number[];
  devices?: string[];
  synchronized: boolean;
  lang: string;
  sid?: string;
  showOptions: ShowOptions[];
}

export class LocalStorageStateModel {
  profiles!: { [id: number]: IProfile };
  id!: number;
  remoteId?: number;
  ipAddress?: string;
  token?: string;
  lang!: string;
}

const defaults: LocalStorageStateModel = {
  profiles: {},
  id: 0,
  lang: 'en',
};

@State<LocalStorageStateModel>({
  name: 'localStorage',
  defaults,
})
@Injectable()
export class LocalStorageState {
  constructor(
    private readonly apiService: ApiService,
    private readonly translocoService: TranslocoService,
    private readonly store: Store,
    private readonly httpClient: HttpClient,
    private readonly cookieService: CookieService,
    @Inject(WINDOW) private readonly window: Window
  ) {}

  @Selector()
  static profiles({ profiles }: LocalStorageStateModel) {
    return Object.values(profiles);
  }

  @Selector()
  static serverInfo({ remoteId, ipAddress }: LocalStorageStateModel) {
    return { remoteId, ipAddress };
  }

  @Selector()
  static profile(state: LocalStorageStateModel): IProfile {
    const {
      id,
      beta,
      dashboard,
      email,
      expertView,
      hideAllDeviceEvents,
      hideSingleDeviceEvents,
      hideSystemEvents,
      interval,
      lang,
      name,
      // login,
      role,
      nightMode,
      rooms,
      devices,
      synchronized,
      showOptions,
    } = state.profiles[state.id];
    return {
      id,
      beta,
      dashboard,
      email,
      expertView,
      hideAllDeviceEvents,
      hideSingleDeviceEvents,
      hideSystemEvents,
      interval,
      lang,
      // login,
      role,
      name,
      nightMode,
      rooms,
      devices,
      synchronized,
      showOptions,
    };
  }

  @Selector()
  static nightMode(state: LocalStorageStateModel): boolean {
    return state.profiles[state.id].nightMode;
  }

  @Selector()
  static lang(state: LocalStorageStateModel): string {
    return state.lang ?? 'en';
  }

  // @Selector()
  // static token(state: LocalStorageStateModel): string | undefined {
  //   return state.token;
  // }

  @Selector()
  static dashboard(state: LocalStorageStateModel): string[] {
    return state.profiles[state.id].dashboard;
  }

  static showOptions(
    place: Pages
  ): (state: LocalStorageStateModel) => ShowOptions | undefined {
    return (state: LocalStorageStateModel) => {
      return state.profiles[state.id].showOptions?.find(
        (option) => place === option.place
      );
    };
  }

  static isEventsHideById(id: string): (...args: never) => boolean {
    return createSelector(
      [LocalStorageStateModel],
      (state: LocalStorageStateModel) =>
        state.profiles[state.id].hideSingleDeviceEvents.includes(id)
    );
  }

  static profileAdapter({
    id,
    beta,
    dashboard,
    email,
    expert_view: expertView,
    hide_all_device_events: hideAllDeviceEvents,
    hide_single_device_events: hideSingleDeviceEvents,
    hide_system_events: hideSystemEvents,
    interval,
    lang,
    login,
    name,
    night_mode: nightMode,
    role,
    rooms,
    devices,
  }: any) {
    return {
      id,
      beta,
      dashboard,
      email,
      expertView,
      hideAllDeviceEvents,
      hideSingleDeviceEvents,
      hideSystemEvents,
      interval,
      lang,
      login,
      name,
      nightMode,
      role,
      rooms,
      devices,
      synchronized: true,
    };
  }

  @Action(Login)
  login({ patchState }: StateContext<LocalStorageStateModel>, { id }: Login) {
    patchState({ id });
    this.store.dispatch(new UpdateProfile());
  }

  // beta: true
  // dashboard: (3) ["ZWayVDev_zway_2-0-51-0", "ZWayVDev_zway_2-0-51-1", "PhilioHW_8_zway_Tamper"]
  // email: ""
  // expert_view: true
  // hide_all_device_events: false
  // hide_single_device_events: ["Code_Device_sensorMultilevel_13"]
  // hide_system_events: false
  // id: 1
  // interval: 2000
  // lang: "ru"
  // login: "admin"
  // name: "Administrator"
  // night_mode: false
  // role: 1
  // rooms: [0]
  // sid: "53d2a6cf-a94b-33c8-d462-fb5b1a249da5"
  // uuid: "3c879de0-846b-4195-490d-ae1ad8c08790"

  @Action(Logout)
  logout({ patchState }: StateContext<LocalStorageStateModel>) {
    this.store.dispatch(new ResetFilters());
    return this.httpClient.get('/ZAutomation/api/v1/logout').pipe(
      tap(() => {
        this.cookieService.delete('ZBW_SESSID', '/');
        patchState({ profiles: {}, id: 0 });

        this.window.location.reload();
      })
    );
  }

  @Action(UpdateProfile)
  updateProfile({ getState }: StateContext<LocalStorageStateModel>) {
    const id = getState().id;
    return this.apiService
      .send<{ data: object }>(
        'profiles',
        { command: id },
        { withResponse: true }
      )
      .pipe(
        map((profile) => ({ ...profile.data })),
        tap((profile) => {
          this.store.dispatch(
            new SetProfile(LocalStorageState.profileAdapter(profile))
          );
        })
      );
  }

  @Action(SetProfile)
  setProfile(
    { setState, getState }: StateContext<LocalStorageStateModel>,
    { profile }: SetProfile // sid: "53d2a6cf-a94b-33c8-d462-fb5b1a249da5" // uuid: "3c879de0-846b-4195-490d-ae1ad8c08790"
  ) {
    const id = profile.id ?? getState().id;
    if (!id) return;
    const profiles = { ...getState().profiles };
    const storeProfile = { ...profiles[id] };
    profiles[id] = { ...profiles[id], ...profile };
    setState(
      patch({
        profiles: profiles,
        lang: id === getState().id ? profile.lang ?? getState().lang : 'en',
      })
    );
    if (id === getState().id) {
      this.updateLocationAndDevices(storeProfile, profile);
      this.store.dispatch(new SetNotificationsFilters());
    }
  }

  @Action(NightMode)
  changeTheme(
    { getState, setState }: StateContext<LocalStorageStateModel>,
    { nightMode }: { nightMode: boolean }
  ) {
    const id = getState().id;
    setState(
      patch({
        profiles: patch({
          [id]: patch({
            nightMode,
            synchronized: false,
          }),
        }),
      })
    );
  }

  @Action(SetUser)
  setUser(
    { patchState }: StateContext<LocalStorageStateModel>,
    { profile }: SetUser
  ) {
    if (profile.id) {
      patchState({ id: profile.id });
      this.store.dispatch(
        new SetProfile(LocalStorageState.profileAdapter(profile))
      );
    }
  }

  @Action(SetServerInfo)
  setServerInfo(
    { patchState }: StateContext<LocalStorageStateModel>,
    { remoteId, ipAddress }: SetServerInfo
  ) {
    patchState({ remoteId, ipAddress });
  }

  private updateLocationAndDevices(
    storedProfile: IProfile,
    updatedProfile: Partial<IProfile>
  ) {
    const { dashboard = [], rooms = [], devices = [] } = updatedProfile;
    const {
      dashboard: currentDashboard = [],
      rooms: currentRooms = [],
      devices: currentDevices = [],
    } = storedProfile;
    dashboard
      .filter((el: string) => !currentDashboard.includes(el))
      .concat(currentDashboard.filter((el) => !dashboard.includes(el)))
      .map((id: string) => {
        this.store.dispatch(new ChangeDevice({ id }));
      });
    const roomsCount = [...new Set([...currentRooms, ...rooms])].length;
    if (roomsCount !== currentRooms.length || roomsCount !== rooms.length) {
      this.store.dispatch(new UpdateAllLocations());
    }
    const devicesCount = [...new Set([...currentDevices, ...devices])].length;
    if (
      devicesCount !== currentDevices.length ||
      devicesCount !== devices.length
    ) {
      this.store.dispatch(new UpdateAllDevices());
    }
  }
}
