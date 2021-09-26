import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { TranslocoModule } from '@ngneat/transloco';
import { RoomComponent } from './room/room.component';
import { RoomsSubMenuComponent } from './rooms-sub-menu/rooms-sub-menu.component';
import { SecureModule } from '@features/directives/secure/secure.module';
import { RoomConfigComponent } from './room-config/room-config.component';
import { RoomsGalleryComponent } from './rooms-gallery/rooms-gallery.component';
import { RoomWidgetComponent } from './room-widget/room-widget.component';
import { RoomWidgetSensorComponent } from './room-widget/room-widget-secsor/room-widget-sensor.component';
import { RoomSubMenuComponent } from './room/room-sub-menu/room-sub-menu.component';
import { DropDownModule } from '@modules/drop-down/drop-down.module';
import { RoomSelectComponent } from './room/room-select/room-select.component';
import { LoadScreenModule } from '@modules/load-screen/load-screen.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackButtonModule } from '@features/directives/back-button/back-button.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HelpTextModule } from '@modules/help-text/help-text.module';
import { FileNameModule } from '@features/pipes/file-name/file-name.module';
import { AddRoomComponent } from './add-room/add-room.component';
import {
  TuiAvatarModule,
  TuiDataListWrapperModule,
  TuiIslandModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { TuiRippleModule, TuiTouchableModule } from '@taiga-ui/addon-mobile';
import { TuiDataListModule, TuiScrollbarModule } from '@taiga-ui/core';
import { MainSensorWidgetComponent } from './main-sensor-widget/main-sensor-widget.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeviceListModule } from '@components/share/device-list/device-list.module';

@NgModule({
  declarations: [
    RoomsComponent,
    RoomComponent,
    RoomsSubMenuComponent,
    RoomConfigComponent,
    RoomsGalleryComponent,
    RoomWidgetComponent,
    RoomWidgetSensorComponent,
    RoomSubMenuComponent,
    RoomSelectComponent,
    AddRoomComponent,
    MainSensorWidgetComponent,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    TranslocoModule,
    SecureModule,
    DropDownModule,
    LoadScreenModule,
    ReactiveFormsModule,
    BackButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    HelpTextModule,
    FileNameModule,
    TuiIslandModule,
    TuiRippleModule,
    TuiScrollbarModule,
    TuiTouchableModule,
    TuiAvatarModule,
    FontAwesomeModule,
    DeviceListModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    FormsModule,
    TuiDataListModule,
  ],
})
export class RoomsModule {}
