import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { Actions, Select, Store } from '@ngxs/store';
import { Router, RouterOutlet } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, switchMap, timer } from 'rxjs';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { takeUntil, tap } from 'rxjs/operators';
import { jumpOutAnimation } from './layouts/mobile-layout/animations';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '@core/services/api/api.service';
import { ServerTime, SetServerDateOptions } from '@store/locals/locals.actions';
import { IServerDateOptions } from '@store/locals/locals.state';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { LoggerService } from '@core/services/logger.service';

@Component({
  selector: 'z-wave-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [jumpOutAnimation],
  providers: [TuiDestroyService],
})
export class AppComponent implements OnInit {
  @Select(LocalStorageState.lang) lang$!: Observable<string>;
  @Select(LocalStorageState.nightMode) nightMode$!: Observable<boolean>;

  constructor(
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly store: Store,
    private readonly translocoService: TranslocoService,
    private readonly destroyService$: TuiDestroyService,
    private readonly apiService: ApiService,
    @Inject(DOCUMENT) private readonly document: Document,
    @Optional() private readonly loggerService: LoggerService
  ) {
    this.lang$
      .pipe(
        takeUntil(destroyService$),
        tap((lang) => {
          translocoService.setActiveLang(lang);
          this.document.documentElement.lang = lang;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.apiService
      .send<IServerDateOptions>('time', undefined, { withResponse: true })
      .pipe(
        tap((serverDateOptions) =>
          this.store.dispatch(new SetServerDateOptions(serverDateOptions))
        ),
        switchMap(() => timer(0, 1000)),
        tap(() => this.store.dispatch(new ServerTime(Date.now()))),
        takeUntil(this.destroyService$)
      )
      .subscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.animation;
  }

  save() {
    this.loggerService.save();
  }
}
