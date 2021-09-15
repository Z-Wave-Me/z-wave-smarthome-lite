import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormBuilder, FormControl } from '@angular/forms';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { map, takeUntil, tap } from 'rxjs/operators';
import { NightMode } from '@store/local-storage/local-storage.actions';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'z-wave-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
  providers: [DestroyService],
})
export class MobileHeaderComponent {
  themeSwitcher: FormControl;
  title$: Observable<string>;
  constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    private readonly destroyService$: DestroyService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.title$ = this.activatedRoute.url.pipe(
      map((data) => {
        console.log(data);
        return 'root';
      })
    );
    const mode = store.selectSnapshot<boolean>(LocalStorageState.nightMode);
    this.themeSwitcher = formBuilder.control(mode);
    this.themeSwitcher.valueChanges
      .pipe(
        takeUntil(this.destroyService$),
        tap((enabled) => {
          this.store.dispatch(new NightMode(enabled));
        })
      )
      .subscribe();
  }
}
