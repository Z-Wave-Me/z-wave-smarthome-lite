import { Injectable, OnDestroy } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetProfile } from './profile.actions';
import { AuthTokenInterface, ProfileInterface } from '../profile/profile.interfaces';
import { ApiService } from '@core/services/api/api.service';
import { take, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subscription } from 'rxjs';

export class ProfileStateModel implements ProfileInterface {
  authTokens?: AuthTokenInterface[];
  beta?: boolean;
  dashboard?: any[];
  email?: string;
  // tslint:disable-next-line:variable-name
  expert_view?: boolean;
  // tslint:disable-next-line:variable-name
  hide_all_device_events?: boolean;
  // tslint:disable-next-line:variable-name
  hide_single_device_events?: any[];
  // tslint:disable-next-line:variable-name
  hide_system_events?: boolean;
  id?: number;
  interval?: number;
  lang?: string;
  login?: string;
  name?: string;
  // tslint:disable-next-line:variable-name
  night_mode?: boolean;
  role?: number;
  rooms?: number[];
  uuid?: string;
  settings!: { dashboard: { orderBy: string }; elements: { orderBy: string }; rooms: { orderBy: string } };
}

const defaults = {
  settings: { dashboard: { orderBy: '1' }, elements: { orderBy: '2' }, rooms: { orderBy: '3' } },
};

@State<ProfileStateModel>({
  name: 'profile',
  defaults,
})
@Injectable()
export class ProfileState implements OnDestroy {
  private subscription?: Subscription;
  @Selector()
  // tslint:disable-next-line:typedef
  static settings(store: ProfileStateModel) {
    return store.settings;
  }
  @Selector()
  static profile(store: ProfileStateModel): ProfileStateModel {
    return store;
  }
  constructor(private apiService: ApiService, private translocoService: TranslocoService) {
    translocoService.setFallbackLangForMissingTranslation({ fallbackLang: 'en' });
  }

  @Action(SetProfile)
  setProfile({ setState }: StateContext<ProfileStateModel>): Observable<any> {
    return this.apiService.send('profiles', { command: '/1' }).pipe(
      tap(({ data }: { data: ProfileInterface }) => {
        const lang: string | undefined = data.lang;
        if (lang) {
          this.subscription = this.translocoService
            .load(lang)
            .pipe(take(1))
            .subscribe(() => {
              this.translocoService.setActiveLang(lang);
            });
        }
        setState(patch({ ...data }));
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
