import { UserState } from './/user/user.state';
import { ProfileState } from './/profile/profile.state';
import { DevicesState } from './/devices/devices.state';
import { LocationsState } from './/locations/locations.state';
import { LocalsState } from '@store/locals/locals.state';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { FilterState } from '@store/filter/filter.state';
import { NotificationsState } from '@store/notifications/notifications.state';
import { NotificationFiltersState } from '@store/notification-filters/notification-filters.state';

export const states = [
  UserState,
  ProfileState,
  DevicesState,
  LocationsState,
  LocalStorageState,
  LocalsState,
  FilterState,
  NotificationsState,
  NotificationFiltersState,
];
