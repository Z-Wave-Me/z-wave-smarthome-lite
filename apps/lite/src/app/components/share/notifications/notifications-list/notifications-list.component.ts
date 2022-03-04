import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import {
  Notification,
  NotificationsState,
} from '@store/notifications/notifications.state';
import { Observable } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { faRadar } from '@fortawesome/pro-thin-svg-icons';

@Component({
  selector: 'z-wave-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsListComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport?: CdkVirtualScrollViewport;
  // notifications$!: Observable<Notification[]>;
  @Select(NotificationsState.notifications) notifications$!: Observable<
    Notification[]
  >;
  faRadar = faRadar;
  trackBy(_: number, { id }: Notification) {
    return id;
  }
}
