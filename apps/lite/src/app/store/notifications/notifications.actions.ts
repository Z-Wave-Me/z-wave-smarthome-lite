import { SNotification } from '@store/notifications/notifications.state';

export class AddNotifications {
  static readonly type = '[Notifications] Add Notifications';

  constructor(public notification: SNotification[] | SNotification) {}
}

export class SetNotificationsFilters {
  static readonly type = '[Notifications] Set Notifications Filters';
}
