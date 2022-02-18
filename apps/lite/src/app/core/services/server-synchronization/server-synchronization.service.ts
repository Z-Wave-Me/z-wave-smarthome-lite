import { Injectable, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  IProfile,
  LocalStorageState,
} from '@store/local-storage/local-storage.state';
import { EMPTY, merge, Observable, Subject, switchMap } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { ApiService } from '@core/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ServerSynchronizationService implements OnDestroy {
  @Select(LocalStorageState.profiles) profiles$!: Observable<IProfile[]>;
  private readonly destroy$ = new Subject<void>();
  constructor(
    private readonly store: Store,
    private readonly apiService: ApiService
  ) {
    this.profiles$
      .pipe(
        takeUntil(this.destroy$),
        map((profiles) =>
          (profiles ?? []).filter(({ synchronized }) => !synchronized)
        ),
        filter((profiles) => !!profiles.length),
        switchMap((profiles: IProfile[]) => {
          console.warn(profiles);
          return merge(
            ...profiles.map(({ id, ...profile }) =>
              this.apiService.send('profiles', {
                command: id,
                method: 'put',
                data: {
                  beta: profile.beta,
                  dashboard: profile.dashboard,
                  email: profile.email,
                  expert_view: profile.expertView,
                  hide_all_device_events: profile.hideAllDeviceEvents,
                  hide_single_device_events: profile.hideSingleDeviceEvents,
                  hide_system_events: profile.hideSystemEvents,
                  interval: profile.interval,
                  lang: profile.lang,
                  login: profile.login,
                  name: profile.name,
                  night_mode: profile.nightMode,
                  role: profile.role,
                  rooms: profile.rooms,
                },
              })
            )
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
