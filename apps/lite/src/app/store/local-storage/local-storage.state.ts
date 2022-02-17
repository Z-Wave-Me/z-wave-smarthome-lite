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
  Pages,
  ShowOptions,
  SupportLanguages,
} from '@modules/interfaces/pages.interfaces';
import { Observable, of, switchMap } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
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
import { AlertService } from '@core/services/alert/alert.service';
import { ChangeDevice } from '@store/devices/devices.actions';
import { patch } from '@ngxs/store/operators';

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
  login?: string;
  name?: string;
  nightMode: boolean;
  rooms?: number[];
  synchronized: boolean;
  lang: SupportLanguages;
  role?: number;
  showOptions: ShowOptions[];
}

export class LocalStorageStateModel {
  profiles!: { [id: number]: IProfile };
  id!: number;
  remoteId!: number;
  ipAddress!: string;
  token?: string;
  // uuid: "3c879de0-846b-4195-490d-ae1ad8c08790"
}

const defaults: LocalStorageStateModel = {
  profiles: {},
  id: 0,
  remoteId: -1,
  ipAddress: '',
};

@State<LocalStorageStateModel>({
  name: 'localStorage',
  defaults,
})
@Injectable()
export class LocalStorageState {
  @Selector()
  static profiles({ profiles }: LocalStorageStateModel) {
    return Object.values(profiles);
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
      login,
      name,
      nightMode,
      role,
      rooms,
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
      login,
      name,
      nightMode,
      role,
      rooms,
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
    return state.profiles[state.id].lang;
  }

  @Selector()
  static dashboard(state: LocalStorageStateModel): string[] {
    return state.profiles[state.id].dashboard;
  }

  // @Selector()
  // static token(state: LocalStorageStateModel): string | undefined {
  //   return state.token;
  // }

  static showOptions(
    place: Pages
  ): (state: LocalStorageStateModel) => ShowOptions | undefined {
    return (state: LocalStorageStateModel) => {
      return state.profiles[state.id].showOptions?.find(
        (option) => place === option.place
      );
    };
  }

  static isEventsHideById(id: string): (...args: any) => boolean {
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
      synchronized: true,
    };
  }

  constructor(
    private readonly apiService: ApiService,
    private readonly translocoService: TranslocoService,
    private readonly store: Store,
    private readonly alertService: AlertService
  ) {}

  @Action(Login)
  login(
    { patchState }: StateContext<LocalStorageStateModel>,
    { payload }: Login
  ): Observable<any> {
    return this.apiService.send('login', { data: payload }).pipe(
      // tap((data) => console.warn(data)),
      tap({
        next: ({ data: { sid: token, id } }) => {
          patchState({ token, id });
          // patchState({ token, lang, role });
          this.store.dispatch(new UpdateProfile());
        },
        error: ({ statusText }) => {
          this.alertService.error(statusText);
        },
      })
    );
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
  logout({
    setState,
  }: StateContext<LocalStorageStateModel>): Observable<boolean> {
    setState(defaults);
    return this.apiService.send('logout').pipe(
      tap(() => {
        setState(defaults);
      }),
      mapTo(true)
    );
  }

  @Action(UpdateProfile)
  updateProfile({ getState }: StateContext<LocalStorageStateModel>) {
    const id = getState().id;
    return this.apiService.send<any>('profiles', { command: id }).pipe(
      map((profile) => ({ ...profile.data })),
      tap((profile) => {
        console.warn('PROFILE', profile);
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
    const id = profile.id;
    if (!id) return;
    const currentDashboard = getState().profiles[id]?.dashboard ?? [];
    setState(
      patch({
        profiles: { ...getState().profiles, [id]: profile },
      })
    );
    const { dashboard } = profile;
    if (dashboard)
      dashboard
        .filter((el: string) => !currentDashboard.includes(el))
        .concat(currentDashboard.filter((el) => !dashboard.includes(el)))
        .map((id: string) => {
          this.store.dispatch(new ChangeDevice({ id }));
        });
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
    // patchState({ nightMode, synchronized: false });
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
}
