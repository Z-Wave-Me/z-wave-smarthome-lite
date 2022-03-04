import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { faSignOut, faUserCog } from '@fortawesome/pro-regular-svg-icons';
import { FormBuilder, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Logout, NightMode } from '@store/local-storage/local-storage.actions';
import { Observable, of } from 'rxjs';
import { IconSupplierService } from '@core/services/icon-supplier/icon-supplier.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCogs, faMoon } from '@fortawesome/pro-solid-svg-icons';
import { faRouter, faSunBright } from '@fortawesome/pro-light-svg-icons';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { DeviceDetectorService } from '@core/services/device-detector/device-detector.service';
import { WINDOW } from '@ng-web-apis/common';

export interface MenuItem {
  type: string;
  count: number;
  icon: IconDefinition;
}

@Component({
  selector: 'z-wave-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsMenuComponent {
  @Select(LocalStorageState.nightMode) nightMode$!: Observable<boolean>;
  readonly faMoon = faMoon;
  readonly faSun = faSunBright;
  readonly faCogs = faUserCog;
  readonly faSettingCogs = faCogs;
  readonly faSignOut = faSignOut;
  readonly faRouter = faRouter;
  readonly showElementsFilters$: Observable<boolean>;
  readonly showNotificationsFilters$: Observable<boolean>;
  endSession?: {
    icon: IconDefinition;
    text: string;
    callback: () => void;
  };
  themeSwitcher?: FormControl;
  open = false;

  constructor(
    private readonly iconSupplierService: IconSupplierService,
    private readonly faIconLibrary: FaIconLibrary,
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    private readonly destroyService$: DestroyService,
    private readonly router: Router,
    private readonly deviceDetectorService: DeviceDetectorService,
    @Inject(WINDOW) private readonly window: Window
  ) {
    this.showElementsFilters$ = of(void 0).pipe(
      map(() => this.router.url === '/elements')
    );
    this.showNotificationsFilters$ = of(void 0).pipe(
      map(() => this.router.url === '/events')
    );
    this.nightMode$
      .pipe(
        takeUntil(this.destroyService$),
        switchMap((mode) => {
          this.themeSwitcher = formBuilder.control(mode);
          return this.themeSwitcher.valueChanges;
        }),
        tap((enabled) => {
          this.store.dispatch(new NightMode(enabled));
        })
      )
      .subscribe();

    this.logoutSetup();
  }

  toggle(open: boolean) {
    this.open = open;
  }

  private logoutSetup() {
    if (
      this.deviceDetectorService.isIOS ||
      this.deviceDetectorService.isAndroid
    ) {
      const url =
        '/htdocs' +
        (this.deviceDetectorService.isAndroid ? '/android/' : '/ios/') +
        'index.htm';
      this.endSession = {
        icon: this.faRouter,
        text: 'my_hubs',
        callback: () => (window.location.href = url),
      };
    } else {
      this.endSession = {
        icon: this.faSignOut,
        callback: () => this.store.dispatch(new Logout()),
        text: 'nav_logout',
      };
    }
  }
}
