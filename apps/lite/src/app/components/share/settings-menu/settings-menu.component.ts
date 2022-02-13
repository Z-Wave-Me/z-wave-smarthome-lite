import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { TuiHostedDropdownComponent } from '@taiga-ui/core';
import { faUserCog } from '@fortawesome/pro-regular-svg-icons';
import { FormBuilder, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { NightMode } from '@store/local-storage/local-storage.actions';
import { Observable, of, startWith } from 'rxjs';
import { DevicesState } from '@store/devices/devices.state';
// import { FilterState } from '@store/filter/filter.state';
import { IconSupplierService } from '@core/services/icon-supplier/icon-supplier.service';
// import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
// import { faFilter as fasFilter, faFilter as falFilter } from '@fortawesome/free-solid-svg-icons';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import {
  AddFilter,
  RemoveFilter,
  SetTag,
  ToggleHidden,
} from '@store/filter/filter.actions';
import { FilterState, FilterStateModel } from '@store/filter/filter.state';
// import { faFilter as falFilter } from '@fortawesome/pro-light-svg-icons';
import { faFilter as falFilter } from '@fortawesome/free-solid-svg-icons';
import { faFilter as fasFilter } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLowVision } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';

export interface MenuItem {
  type: string;
  count: number;
  icon: string;
}

@Component({
  selector: 'z-wave-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsMenuComponent {
  themeSwitcher?: FormControl;
  @Select(LocalStorageState.nightMode) nightMode$!: Observable<boolean>;
  readonly typesAndCount$: Observable<MenuItem[]>;
  @Select(DevicesState.showDevice) total$!: Observable<string[]>;
  @Select(FilterState.activeFilters) activeFilters$!: Observable<boolean>;
  faLowVision = faLowVision;
  faTags = faTags;
  open = false;
  tag$: Observable<string | undefined>;
  @Select(DevicesState.tagsList) tagsList$!: Observable<string[]>;
  showFilters$: Observable<boolean>;
  constructor(
    private readonly iconSupplierService: IconSupplierService,
    private readonly faIconLibrary: FaIconLibrary,
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    private readonly destroyService$: DestroyService,
    private readonly router: Router
  ) {
    this.showFilters$ = of(void 0).pipe(
      map(() => this.router.url === '/elements')
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

    this.typesAndCount$ = store.select(DevicesState.devicesTypeAndCount).pipe(
      map((devices) =>
        devices.map((device) => ({
          ...device,
          icon: iconSupplierService.deviceTypeIconSupplier(device.type),
        }))
      )
    );
    faIconLibrary.addIcons(falFilter, fasFilter);
    this.tag$ = store.select(({ filter }: FilterStateModel) => filter.tag);
  }
  faCogs = faUserCog;
  // readonly items = ['Edit', 'Download', 'Rename', 'Delete'];
  toggle(open: boolean) {
    this.open = open;
  }

  trackByFn(index: number): number {
    return index;
  }

  addFilter(deviceType: string): void {
    this.active(deviceType)
      ? this.store.dispatch(new RemoveFilter({ deviceType: [deviceType] }))
      : this.store.dispatch(new AddFilter({ deviceType: [deviceType] }));
  }

  active(deviceType: string): boolean {
    return (
      this.store.selectSnapshot(({ filter }) =>
        filter.filter?.deviceType?.includes(deviceType)
      ) ?? false
    );
  }

  showHidden(): void {
    this.store.dispatch(new ToggleHidden());
  }

  showHiddenActive(): boolean {
    return this.store.selectSnapshot(({ filter }) => filter.showHidden);
  }

  addTagFilter(tag?: string): void {
    this.store.dispatch(new SetTag(tag));
  }
}
