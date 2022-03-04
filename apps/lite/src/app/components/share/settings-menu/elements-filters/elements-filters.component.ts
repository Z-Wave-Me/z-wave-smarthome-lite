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

import { faUsersCog } from '@fortawesome/pro-light-svg-icons';
import { MenuItem } from '@components/share/settings-menu/settings-menu.component';
import {
  faCogs,
  faLowVision,
  faSignOut,
  faSortAlphaDown,
  faTags,
  faArrowDownTriangleSquare,
} from '@fortawesome/pro-solid-svg-icons';

import { faTags as falTag } from '@fortawesome/pro-light-svg-icons';
import { faRouter } from '@fortawesome/pro-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowDownBigSmall } from '@fortawesome/pro-regular-svg-icons/faArrowDownBigSmall';
import {
  faArrowDownZA,
  faArrowUpAZ,
  faArrowUpSmallBig,
  faEye,
  faEyeLowVision,
} from '@fortawesome/pro-regular-svg-icons';
import { faFilter as fasFilter } from '@fortawesome/pro-solid-svg-icons';
import { faFilter as falFilter } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'z-wave-elements-filters',
  templateUrl: './elements-filters.component.html',
  styleUrls: ['./elements-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsFiltersComponent {
  readonly orderList: ReadonlyMap<
    string,
    { order: Order; desc: boolean; icon: IconDefinition }
  > = new Map([
    [
      'updateTimeDESC',
      { order: 'updateTime', desc: true, icon: faArrowDownBigSmall },
    ],
    [
      'creationTimeDESC',
      { order: 'creationTime', desc: true, icon: faArrowDownBigSmall },
    ],
    [
      'creationTimeASC',
      { order: 'creationTime', desc: false, icon: faArrowUpSmallBig },
    ],
    ['titleASC', { order: 'title', desc: false, icon: faArrowUpAZ }],
    ['titleDESC', { order: 'title', desc: true, icon: faArrowDownZA }],
    [
      'orderElements',
      { order: 'elements', desc: false, icon: faArrowDownTriangleSquare },
    ],
  ]);
  open = false;
  @Select(DevicesState.showDevice) total$!: Observable<string[]>;
  @Select(FilterState.activeFilters) activeFilters$!: Observable<boolean>;
  @Select(DevicesState.tagsList) tagsList$!: Observable<string[]>;

  readonly faCogs = faUsersCog;
  readonly faLowVision = faEyeLowVision;
  readonly faEye = faEye;
  readonly faTags = faTags;
  readonly faSortAlphaDown = faSortAlphaDown;
  readonly faSettingCogs = faCogs;
  readonly faSignOut = faSignOut;
  readonly faRouter = faRouter;

  readonly falFilter = falFilter;
  readonly fasFilter = fasFilter;

  readonly typesAndCount$: Observable<MenuItem[]>;
  readonly tag$: Observable<string | undefined>;
  readonly order$: Observable<string>;
  falTag = falTag;

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
    // faIconLibrary.addIcons(falFilter, fasFilter);
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

  setOrder(options: { order: Order; desc: boolean }, name: string): void {
    this.store.dispatch(
      new SetOrder('elements', options.order, options.desc, name)
    );
  }
}
