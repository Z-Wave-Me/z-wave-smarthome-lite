import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { DevicesState } from '@store/devices/devices.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IconSupplierService } from '@core/services/icon-supplier/icon-supplier.service';
import { AddFilter, RemoveFilter, ToggleHidden } from '@store/filter/filter.actions';
import { FilterState } from '@store/filter/filter.state';
// import { faFilter as falFilter } from '@fortawesome/pro-light-svg-icons';
// import { faFilter as fasFilter } from '@fortawesome/free-solid-svg-icons';
// import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
// import { faLowVision } from '@fortawesome/pro-regular-svg-icons';
export interface MenuItem {
  type: string;
  count: number;
  icon: string;
}

@Component({
  selector: 'z-wave-element-sub-menu-filter-by-type',
  templateUrl: './element-sub-menu-filter-by-type.component.html',
  styleUrls: ['./element-sub-menu-filter-by-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementSubMenuFilterByTypeComponent {
  readonly typesAndCount$: Observable<MenuItem[]>;
  @Select(DevicesState.showDevice) total$!: Observable<string[]>;
  @Select(FilterState.activeFilters) activeFilters$!: Observable<boolean>;
  // faLowVision = faLowVision;
  constructor(
    private readonly iconSupplierService: IconSupplierService,
    private readonly store: Store,
    // private readonly faIconLibrary: FaIconLibrary,
  ) {
    this.typesAndCount$ = store.select(DevicesState.devicesTypeAndCount).pipe(
      map((devices) =>
        devices.map((device) => ({
          ...device,
          icon: iconSupplierService.deviceTypeIconSupplier(device.type),
        })),
      ),
    );
    // faIconLibrary.addIcons(falFilter, fasFilter);
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
    return this.store.selectSnapshot(({ filter }) => filter.filter?.deviceType?.includes(deviceType)) ?? false;
  }

  showHidden(): void {
    this.store.dispatch(new ToggleHidden());
  }

  showHiddenActive(): boolean {
    return this.store.selectSnapshot(({ filter }) => filter.showHidden);
  }
}
