import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormBuilder, FormControl } from '@angular/forms';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { NightMode } from '@store/local-storage/local-storage.actions';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileTitleService } from '@core/services/mobile-title/mobile-title.service';

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
    private readonly mobileTitleService: MobileTitleService
  ) {
    this.title$ = mobileTitleService.title();
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
