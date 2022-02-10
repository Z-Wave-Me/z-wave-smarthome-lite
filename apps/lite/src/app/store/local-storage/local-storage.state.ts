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
import { map, tap } from 'rxjs/operators';
import { ApiService } from '@core/services/api/api.service';
import {
  Login,
  Logout,
  NightMode,
  SetProfile,
  UpdateProfile,
} from '@store/local-storage/local-storage.actions';
import { TranslocoService } from '@ngneat/transloco';
import { AlertService } from '@core/services/alert/alert.service';
import { ChangeDevice } from '@store/devices/devices.actions';

export interface ZWayResponse<T> {
  code: number;
  data: T;
  error: string | null;
  message: string;
}

export interface IProfile {
  id?: number;
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
}

export class LocalStorageStateModel implements IProfile {
  token?: string;
  showOptions?: ShowOptions[];
  lang!: SupportLanguages;
  role?: number;
  dashboard!: string[];
  beta?: boolean;
  email?: string;
  expertView?: boolean;
  hideAllDeviceEvents?: boolean;
  hideSingleDeviceEvents!: string[];
  hideSystemEvents?: boolean;
  id?: number;
  interval?: number;
  login?: string;
  name?: string;
  nightMode!: boolean;
  rooms?: number[];
  synchronized!: boolean;
  // uuid: "3c879de0-846b-4195-490d-ae1ad8c08790"
}

const defaults: LocalStorageStateModel = {
  lang: 'en',
  dashboard: [],
  hideSingleDeviceEvents: [],
  nightMode: false,
  synchronized: true,
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
    private readonly alertService: AlertService
  ) {}

  @Selector()
  static profile({
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
  }: LocalStorageStateModel) {
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
    };
  }

  @Selector()
  static nightMode({ nightMode }: LocalStorageStateModel): boolean {
    return nightMode;
  }

  @Selector()
  static lang({ lang }: LocalStorageStateModel): string {
    return lang;
  }

  @Selector()
  static dashboard(state: LocalStorageStateModel): string[] {
    return state.dashboard;
  }

  @Selector()
  static token(state: LocalStorageStateModel): string | undefined {
    return state.token;
  }

  static showOptions(
    place: Pages
  ): (state: LocalStorageStateModel) => ShowOptions | undefined {
    return (state: LocalStorageStateModel) =>
      state.showOptions?.find((option) => place === option.place);
  }

  static isEventsHideById(id: string): (...args: any) => boolean {
    return createSelector(
      [LocalStorageStateModel],
      ({ hideSingleDeviceEvents }) => hideSingleDeviceEvents.includes(id)
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
  }: never) {
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
    // TODO temporary
    return of(true);
    // return this.apiService.send('logout').pipe(
    //   tap(() => {
    //     setState(defaults);
    //   }),
    // );
  }

  @Action(UpdateProfile)
  updateProfile({ getState }: StateContext<LocalStorageStateModel>) {
    const id = getState().id;
    return (
      id
        ? of({ data: { id } })
        : this.apiService.send<{ data: { id: number } }>('session')
    ).pipe(
      switchMap(({ data: { id } }) =>
        this.apiService
          .send<any>('profiles', { command: id })
          .pipe(map((profile) => ({ ...profile.data, id })))
      ),
      tap((profile) => {
        console.warn('PROFILE', profile);
        this.store.dispatch(
          new SetProfile(LocalStorageState.profileAdapter(profile as never))
        );
      })
    );
  }

  @Action(SetProfile)
  setProfile(
    { patchState, getState }: StateContext<LocalStorageStateModel>,
    { profile }: SetProfile // sid: "53d2a6cf-a94b-33c8-d462-fb5b1a249da5" // uuid: "3c879de0-846b-4195-490d-ae1ad8c08790"
  ) {
    const currentDashboard = getState().dashboard;
    patchState(profile);
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
    { patchState }: StateContext<LocalStorageStateModel>,
    { nightMode }: { nightMode: boolean }
  ) {
    patchState({ nightMode, synchronized: false });
  }
}
