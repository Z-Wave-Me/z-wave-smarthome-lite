import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { Router, RouterOutlet } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subscription } from 'rxjs';
import { Logout } from '@store/local-storage/local-storage.actions';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { takeUntil, tap } from 'rxjs/operators';
import { jumpOutAnimation } from './layouts/mobile-layout/animations';
import { ServerSynchronizationService } from '@core/services/server-synchronization/server-synchronization.service';

@Component({
  selector: 'z-wave-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [jumpOutAnimation],
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(LocalStorageState.lang) lang$!: Observable<string>;
  @Select(LocalStorageState.nightMode) nightMode$!: Observable<boolean>;
  private subscription: Subscription = Subscription.EMPTY;

  constructor(
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly store: Store,
    private readonly translocoService: TranslocoService,
    private readonly destroyService$: DestroyService,
    private readonly serverSynchronizationService: ServerSynchronizationService
  ) {
    this.lang$
      .pipe(
        takeUntil(destroyService$),
        tap((lang) => translocoService.setActiveLang(lang))
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.animation;
  }
}
