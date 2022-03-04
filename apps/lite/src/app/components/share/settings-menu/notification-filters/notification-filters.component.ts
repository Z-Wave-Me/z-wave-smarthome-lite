import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { NotificationsState } from '@store/notifications/notifications.state';
import { NotificationFiltersState } from '@store/notification-filters/notification-filters.state';
import { map } from 'rxjs/operators';
import { LocalsState } from '@store/locals/locals.state';
import {
  SetTimeFilters,
  SetTypeAndSourceFilters,
} from '@store/notification-filters/notification-filters.actions';
import { DevicesState } from '@store/devices/devices.state';
import { IconSupplierService } from '@core/services/icon-supplier/icon-supplier.service';
import { TranslocoService } from '@ngneat/transloco';
import { faBell } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'z-wave-notification-filters',
  templateUrl: './notification-filters.component.html',
  styleUrls: ['./notification-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationFiltersComponent {
  faClock = faClock;
  serverTime = this.store.selectSnapshot(LocalsState.serverTime);
  readonly typeFilterList: ReadonlyMap<string, string> = new Map([
    ['allNotifications', ''],
    ['lb_notify_error', 'module'],
    ['lb_notify_device-info', 'device'],
  ]);
  readonly timeFilterList: ReadonlyMap<
    string,
    [startTime: number, endTime: number]
  > = new Map([
    ['allNotifications', [0, 0]],
    [
      'lb_today',
      [
        new Date(new Date(this.serverTime).setHours(0, 0, 0, 0)).getTime(),
        Infinity,
      ],
    ],
    [
      'lb_yesterday',
      [
        new Date(
          new Date(this.serverTime - 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0)
        ).getTime(),
        new Date(
          new Date(this.serverTime - 24 * 60 * 60 * 1000).setHours(
            23,
            59,
            59,
            999
          )
        ).getTime(),
      ],
    ],
    [
      'thisWeek',
      [
        new Date(
          new Date(this.serverTime - 7 * 24 * 60 * 60 * 1000).setHours(
            23,
            59,
            59,
            999
          )
        ).getTime(),
        Infinity,
      ],
    ],
  ]);
  timeFilter$: Observable<string>;
  typeFilter$: Observable<{ id: string; title: string }>;
  devicesAndTypes$: Observable<
    Record<string, { title: string; count: number; iconPath: string }>
  >;
  faBell = faBell;

  constructor(
    private readonly store: Store,
    private readonly iconSupplierService: IconSupplierService,
    private readonly translocoService: TranslocoService
  ) {
    this.timeFilter$ = this.store
      .select(NotificationFiltersState.timeFilter)
      .pipe(
        map(({ startTime, endTime }) => {
          for (const [key, [start, end]] of this.timeFilterList) {
            // console.warn(start, startTime, '!', end, endTime);
            if (start === startTime && end === endTime) return key;
          }
          return 'allNotifications';
        })
      );
    this.typeFilter$ = this.store
      .select(NotificationFiltersState.typeFilter)
      .pipe(
        map((typeOrId) => {
          for (const [title, id] of this.typeFilterList) {
            if (typeOrId === id)
              return {
                id: typeOrId,
                title: this.translocoService.translate(title),
              };
          }
          return {
            id: typeOrId,
            title: this.store.selectSnapshot(
              DevicesState.getDeviceById(typeOrId)
            ).title,
          };
        })
      );
    this.devicesAndTypes$ = this.store
      .select(NotificationsState.allNotifications)
      .pipe(
        map((notifications) =>
          notifications.reduce<
            Record<string, { title: string; count: number; iconPath: string }>
          >((acc, cur) => {
            if (cur.type.startsWith('device')) {
              if (cur.source in acc) {
                acc[cur.source].count += 1;
              } else {
                const { title, iconType } = this.store.selectSnapshot(
                  DevicesState.getDeviceById(cur.source)
                );
                acc[cur.source] = {
                  title,
                  iconPath: this.iconSupplierService.assignElementIcon({
                    metrics: {
                      icon: iconType,
                      level: 'on',
                    },
                    customIcons: {},
                  }),
                  count: 1,
                };
              }
            }
            return acc;
          }, {})
        )
      );
  }

  trackBy(index: number) {
    return index;
  }

  setTimeFilter([startTime, endTime]: [number, number]) {
    this.store.dispatch(new SetTimeFilters(startTime, endTime));
  }

  setTypeFilter(typeOrId: string) {
    this.store.dispatch(new SetTypeAndSourceFilters(typeOrId));
  }
}
