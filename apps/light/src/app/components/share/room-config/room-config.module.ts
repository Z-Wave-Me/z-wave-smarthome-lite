import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomConfigRoutingModule } from './room-config-routing.module';
import { RoomConfigComponent } from '@components/share/room-config/room-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackButtonModule } from '@features/directives/back-button/back-button.module';
import { TranslocoModule } from '@ngneat/transloco';
import {
  TuiAvatarModule,
  TuiBadgeModule,
  TuiInputModule,
  TuiLineClampModule,
  TuiToggleModule,
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiExpandModule,
  TuiGroupModule,
  TuiNotificationModule,
  TuiScrollbarModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiOverscrollModule } from '@taiga-ui/cdk';
import { LocationCarouselModule } from '@components/share/location-carousel/location-carousel.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadScreenModule } from '@modules/load-screen/load-screen.module';

@NgModule({
  declarations: [RoomConfigComponent],
  imports: [
    CommonModule,
    RoomConfigRoutingModule,
    ReactiveFormsModule,
    BackButtonModule,
    TranslocoModule,
    TuiAvatarModule,
    TuiLineClampModule,
    TuiBadgeModule,
    TuiSvgModule,
    TuiScrollbarModule,
    TuiOverscrollModule,
    LocationCarouselModule,
    TuiButtonModule,
    FontAwesomeModule,
    TuiNotificationModule,
    TuiGroupModule,
    TuiToggleModule,
    FormsModule,
    TuiInputModule,
    LoadScreenModule,
    TuiExpandModule,
  ],
})
export class RoomConfigModule {}
