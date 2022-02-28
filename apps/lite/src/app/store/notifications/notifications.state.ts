import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ApiService } from '@core/services/api/api.service';
import {
  AddNotifications,
  SetNotificationsFilters,
} from '@store/notifications/notifications.actions';
import { insertItem, patch } from '@ngxs/store/operators';
import { LocationsState } from '@store/locations/locations.state';
import { Location } from '@store/locations/location';
import { IconSupplierService } from '@core/services/icon-supplier/icon-supplier.service';
import { DevicesState } from '@store/devices/devices.state';
import {
  IProfile,
  LocalStorageState,
} from '@store/local-storage/local-storage.state';
import { tap } from 'rxjs/operators';
import {
  NotificationFiltersState,
  NotificationFiltersStateModel,
} from '@store/notification-filters/notification-filters.state';

type NotificationsLevel = 'device-info';

/**
 * message :{
 *   dev: string;
 *   l: string;
 *   location: number;
 * } => {
 *   location!: number;
 *   deviceLevel!: string;
 *   deviceId!: string;
 * }
 */
export class SNotification {
  id!: number;
  level!: NotificationsLevel;
  message!: {
    dev: string;
    l: string;
    location: number;
  };
  redeemed!: boolean;
  source!: string;
  timestamp!: string;
  type!: string;
}

export class Notification {
  id!: number;
  level!: NotificationsLevel;
  location?: number;
  deviceLevel!: string;
  deviceName!: string;
  redeemed!: boolean;
  source!: string;
  timestamp!: string;
  type!: string;
  locationName?: string;
  iconPath?: string;
}

export class NotificationsStateModel {
  items!: Notification[];
  hideAllDeviceEvents!: boolean;
  hideSingleDeviceEvents!: string[];
  hideSystemEvents!: boolean;
}

const defaults = {
  items: [],
  hideAllDeviceEvents: false,
  hideSingleDeviceEvents: [],
  hideSystemEvents: false,
};

@State<NotificationsStateModel>({
  name: 'notifications',
  defaults,
})
@Injectable()
export class NotificationsState {
  constructor(
    private readonly iconSupplierService: IconSupplierService,
    private readonly store: Store,
    private readonly apiService: ApiService
  ) {}

  static serverAdapter({ message, ...other }: SNotification): Notification {
    return {
      ...other,
      deviceName: message?.dev,
      deviceLevel: message?.l,
      location: message?.location,
    };
  }

  @Selector([NotificationFiltersState])
  static notifications(
    { items }: NotificationsStateModel,
    { sourceOrType, startTime, endTime }: NotificationFiltersStateModel
  ) {
    return items.filter((notification) => {
      if (
        sourceOrType === notification.source ||
        (sourceOrType && notification.type.startsWith(sourceOrType))
      )
        return true;
      if (startTime && startTime < notification.id) return true;
      if (endTime && endTime > notification.id) return true;
      return !sourceOrType && !endTime && !startTime;
    });
  }

  @Selector()
  static allNotifications({ items }: NotificationsStateModel) {
    return items;
  }

  @Action(AddNotifications)
  addNotifications(
    { setState }: StateContext<NotificationsStateModel>,
    { notification }: AddNotifications
  ) {
    const locations = this.store.selectSnapshot(LocationsState.locations);
    const profile = this.store.selectSnapshot(LocalStorageState.profile);
    // console.error(notification);
    if (Array.isArray(notification)) {
      setState(
        patch({
          items: notification
            // .filter(this.notificationFilter(profile))
            .map((notification) => this.prepareEvent(notification, locations))
            .reverse(),
        })
      );
    } else {
      if (this.notificationFilter(profile)(notification))
        setState(
          patch({
            items: insertItem(this.prepareEvent(notification, locations), 0),
          })
        );
    }
  }

  @Action(SetNotificationsFilters)
  setNotificationsFilters({ setState }: StateContext<NotificationsStateModel>) {
    const profile = this.store.selectSnapshot(LocalStorageState.profile);
    setState(
      patch({
        hideSystemEvents: profile.hideSystemEvents,
        hideSingleDeviceEvents: profile.hideSingleDeviceEvents,
        hideAllDeviceEvents: profile.hideAllDeviceEvents,
      })
    );
    return this.apiService
      .send<{ notifications: SNotification[] }>('notifications', {}, true)
      .pipe(
        tap(({ notifications }) => {
          this.store.dispatch(new AddNotifications(notifications));
        })
      );
  }

  private notificationFilter(profile: IProfile) {
    return (notification: SNotification) => {
      if (profile.hideAllDeviceEvents && notification.type.startsWith('device'))
        return false;
      if (profile.hideSystemEvents && notification.type === 'module')
        return false;
      return !profile.hideSingleDeviceEvents.includes(notification.source);
    };
  }

  private prepareEvent(
    sNotification: SNotification,
    locations: { [id: number]: Location }
  ): Notification {
    const notification = NotificationsState.serverAdapter(sNotification);
    const device = this.store.selectSnapshot(
      DevicesState.getDeviceById(sNotification.source)
    );
    // console.log(notification.location, locations);
    // if (notification.location === undefined) {
    //   console.log(notification);
    // }
    notification.locationName = notification.location
      ? locations[notification.location]?.title
      : '';
    notification.iconPath = this.iconSupplierService.assignEventIcon(
      sNotification,
      device
    );
    return notification;
  }
}
