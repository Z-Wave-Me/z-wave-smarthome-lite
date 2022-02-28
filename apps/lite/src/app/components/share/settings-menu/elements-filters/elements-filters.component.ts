import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FilterState,
  FilterStateModel,
  Order,
} from '@store/filter/filter.state';
import {
  AddFilter,
  RemoveFilter,
  SetOrder,
  SetTag,
  ToggleHidden,
} from '@store/filter/filter.actions';
import { IconSupplierService } from '@core/services/icon-supplier/icon-supplier.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DevicesState } from '@store/devices/devices.state';

import { faUserCircle as faUserCog } from '@fortawesome/free-regular-svg-icons';
import { MenuItem } from '@components/share/settings-menu/settings-menu.component';
import {
  faCogs,
  faFilter as fasFilter,
  faFilter as falFilter,
  faLowVision,
  faRoute,
  faSignOutAlt,
  faSortAlphaDown,
  faTags,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'z-wave-elements-filters',
  templateUrl: './elements-filters.component.html',
  styleUrls: ['./elements-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsFiltersComponent {
  readonly orderList: ReadonlyMap<string, [order: Order, desc: boolean]> =
    new Map([
      ['updateTimeDESC', ['updateTime', true]],
      ['creationTimeDESC', ['creationTime', true]],
      ['creationTimeASC', ['creationTime', false]],
      ['titleASC', ['title', false]],
      ['titleDESC', ['title', true]],
      ['orderElements', ['elements', false]],
    ]);
  open = false;
  @Select(DevicesState.showDevice) total$!: Observable<string[]>;
  @Select(FilterState.activeFilters) activeFilters$!: Observable<boolean>;
  @Select(DevicesState.tagsList) tagsList$!: Observable<string[]>;

  readonly faCogs = faUserCog;
  readonly faLowVision = faLowVision;
  readonly faTags = faTags;
  readonly faSortAlphaDown = faSortAlphaDown;
  readonly faSettingCogs = faCogs;
  readonly faSignOut = faSignOutAlt;
  readonly faRouter = faRoute;

  readonly typesAndCount$: Observable<MenuItem[]>;
  readonly tag$: Observable<string | undefined>;
  readonly order$: Observable<string>;

  constructor(
    private readonly iconSupplierService: IconSupplierService,
    private readonly faIconLibrary: FaIconLibrary,
    private readonly store: Store
  ) {
    this.order$ = store.select(
      ({ filter }: FilterStateModel) => filter.orderBy.name
    );

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
