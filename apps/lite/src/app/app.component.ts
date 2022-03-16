import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Actions, Select, Store } from '@ngxs/store';
import { Router, RouterOutlet } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subscription } from 'rxjs';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { first, takeUntil, tap } from 'rxjs/operators';
import { jumpOutAnimation } from './layouts/mobile-layout/animations';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '@core/services/api/api.service';
import { SetServerDateOptions } from '@store/locals/locals.actions';
import { IServerDateOptions } from '@store/locals/locals.state';

@Component({
  selector: 'z-wave-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [jumpOutAnimation],
})
export class AppComponent implements OnDestroy, OnInit {
  @Select(LocalStorageState.lang) lang$!: Observable<string>;
  @Select(LocalStorageState.nightMode) nightMode$!: Observable<boolean>;
  private subscription: Subscription = Subscription.EMPTY;

  constructor(
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly store: Store,
    private readonly translocoService: TranslocoService,
    private readonly destroyService$: DestroyService,
    private readonly apiService: ApiService,
    @Inject(DOCUMENT) private readonly document: Document
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
      .send<IServerDateOptions>('time', undefined, true)
      .pipe(
        first(),
        tap((serverDateOptions) =>
          this.store.dispatch(new SetServerDateOptions(serverDateOptions))
        )
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.animation;
  }
}
