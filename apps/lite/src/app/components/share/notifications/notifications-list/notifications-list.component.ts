import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import {
  Notification,
  NotificationsState,
} from '@store/notifications/notifications.state';
import { Observable } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'z-wave-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsListComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport?: CdkVirtualScrollViewport;
  @Select(NotificationsState.notifications) notifications$!: Observable<
    Notification[]
  >;
  trackBy(_: number, { id }: Notification) {
    return id;
  }
}
