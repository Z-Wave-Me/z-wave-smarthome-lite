import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { faUserCog } from '@fortawesome/pro-regular-svg-icons';
import { faUserCircle as faUserCog } from '@fortawesome/free-regular-svg-icons';
import { FormBuilder, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { NightMode } from '@store/local-storage/local-storage.actions';
import { Observable, of } from 'rxjs';
import { DevicesState } from '@store/devices/devices.state';
// import { FilterState } from '@store/filter/filter.state';
import { IconSupplierService } from '@core/services/icon-supplier/icon-supplier.service';
// import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
// import { faFilter as fasFilter, faFilter as falFilter } from '@fortawesome/free-solid-svg-icons';
// import { faFilter as falFilter } from '@fortawesome/pro-light-svg-icons';
import {
  faFilter as falFilter,
  faFilter as fasFilter,
  faLowVision,
  faSortAlphaDown,
  faTags,
  faCogs,
} from '@fortawesome/free-solid-svg-icons';
import {
  AddFilter,
  RemoveFilter,
  SetOrder,
  SetTag,
  ToggleHidden,
} from '@store/filter/filter.actions';
import {
  FilterState,
  FilterStateModel,
  Order,
} from '@store/filter/filter.state';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

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
  readonly orderList: ReadonlyMap<string, [order: Order, desc: boolean]> =
    new Map([
      ['updateTimeDESC', ['updateTime', true]],
      ['creationTimeDESC', ['creationTime', true]],
      ['creationTimeASC', ['creationTime', false]],
      ['titleASC', ['title', false]],
      ['titleDESC', ['title', true]],
      ['orderElements', ['elements', false]],
    ]);

  @Select(LocalStorageState.nightMode) nightMode$!: Observable<boolean>;
  @Select(DevicesState.showDevice) total$!: Observable<string[]>;
  @Select(FilterState.activeFilters) activeFilters$!: Observable<boolean>;
  @Select(DevicesState.tagsList) tagsList$!: Observable<string[]>;

  readonly faCogs = faUserCog;
  readonly faLowVision = faLowVision;
  readonly faTags = faTags;
  readonly faSortAlphaDown = faSortAlphaDown;
  readonly faSettingCogs = faCogs;

  readonly typesAndCount$: Observable<MenuItem[]>;
  readonly tag$: Observable<string | undefined>;
  readonly showFilters$: Observable<boolean>;
  readonly order$: Observable<string>;

  themeSwitcher?: FormControl;
  open = false;

  constructor(
    private readonly iconSupplierService: IconSupplierService,
    private readonly faIconLibrary: FaIconLibrary,
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    private readonly destroyService$: DestroyService,
    private readonly router: Router
  ) {
    this.order$ = store.select(
      ({ filter }: FilterStateModel) => filter.orderBy.name
    );
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
  // readonly items = ['Edit', 'Download', 'Rename', 'DELETE'];
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

  setOrder(order: [Order, boolean], name: string): void {
    this.store.dispatch(new SetOrder('elements', ...order, name));
  }
}
