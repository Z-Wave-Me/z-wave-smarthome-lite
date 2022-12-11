import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { TranslocoModule } from '@ngneat/transloco';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiDropdownModule,
} from '@taiga-ui/core';
import { RestorePositionModule } from '@features/directives/restore-position/restore-position.module';
import { NotificationWidgetComponent } from './notification-widget/notification-widget.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelpersModule } from '@components/share/helpers/helpers.module';
import { SignificantPipe } from '@features/pipes/significant/significant.pipe';

@NgModule({
  declarations: [NotificationsListComponent, NotificationWidgetComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    TranslocoModule,
    ScrollingModule,
    TuiScrollbarModule,
    RestorePositionModule,
    TuiHostedDropdownModule,
    TuiDropdownModule,
    TuiSvgModule,
    TuiDataListModule,
    FontAwesomeModule,
    HelpersModule,
    SignificantPipe,
  ],
})
export class NotificationsModule {}
