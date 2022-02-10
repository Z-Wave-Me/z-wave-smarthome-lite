import { Injectable, OnDestroy } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
type NotificationsLevel = 'device-info';

interface NotificationMessage {
  dev: string;
  l: string;
  location: number;
}

export class Notifications {
  id!: number;
  level!: NotificationsLevel;
  message!: NotificationMessage;
  redeemed!: boolean;
  source!: string;
  timestamp!: string;
  type!: string;
}
export class NotificationsStateModel {}

const defaults = {};

@State<NotificationsStateModel>({
  name: 'notifications',
  defaults,
})
@Injectable()
export class NotificationsState {}
