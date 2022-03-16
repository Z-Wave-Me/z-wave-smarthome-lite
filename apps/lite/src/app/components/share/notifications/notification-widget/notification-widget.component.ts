import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Notification } from '@store/notifications/notifications.state';
import {
  faCheck,
  faCheckCircle,
  faCheckSquare,
  faMinusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { SetTypeAndSourceFilters } from '@store/notification-filters/notification-filters.actions';
import { LocalsState } from '@store/locals/locals.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'z-wave-notification-widget[notification]',
  templateUrl: './notification-widget.component.html',
  styleUrls: ['./notification-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationWidgetComponent {
  @Input() notification!: Notification;
  @Input() last = false;
  @Input() first = false;
  @Select(LocalsState.localGMT) localGMT$!: Observable<string>;
  open = false;
  actions = [
    {
      title: 'lb_events_source',
      handler: () => this.onlyThisSource(),
      icon: faCheck,
    },
    {
      title: 'lb_events_type',
      handler: () => this.onlyThisType(),
      icon: faCheckCircle,
    },
    {
      title: 'lb_events_source_type',
      handler: () => this.onlyThisSourceAndType(),
      icon: faCheckSquare,
    },
    {
      title: 'lb_hide_events_source',
      handler: () => this.hideThisSource(),
      icon: faMinusCircle,
      color: true,
    },
    {
      title: 'lb_delete_event',
      handler: () => this.removeThisNotification(),
      icon: faTimesCircle,
      color: true,
    },
  ];
  constructor(private readonly store: Store) {}
  onlyThisSource() {
    this.open = false;
    if (this.notification.type.startsWith('device'))
      this.store.dispatch(
        new SetTypeAndSourceFilters(this.notification.source)
      );
  }
  onlyThisType() {
    this.store.dispatch(
      new SetTypeAndSourceFilters(this.notification.type.split('-')[0])
    );
    this.open = false;
  }
  onlyThisSourceAndType() {
    this.open = false;
    if (this.notification.type.startsWith('device')) this.onlyThisSource();
    else this.onlyThisType();
  }
  hideThisSource() {
    this.open = false;
    // this.store.dispatch(new )
    console.log('hideThisSource');
  }
  removeThisNotification() {
    this.open = false;

    console.log('deleteThisNotification');
  }
}
