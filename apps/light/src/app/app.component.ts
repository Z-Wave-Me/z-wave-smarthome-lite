import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subscription } from 'rxjs';
import { Logout } from '@store/local-storage/local-storage.actions';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'z-wave-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
    private readonly destroyService$: DestroyService
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
}
