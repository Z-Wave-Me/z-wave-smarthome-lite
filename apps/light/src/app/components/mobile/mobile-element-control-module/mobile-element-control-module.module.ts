import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileElementControlModuleRoutingModule } from './mobile-element-control-module-routing.module';
import { BackButtonModule } from '@features/directives/back-button/back-button.module';
import {
  TuiAvatarModule,
  TuiBadgeModule,
  TuiDataListWrapperModule,
  TuiFieldErrorModule,
  TuiInputModule,
  TuiInputTagModule,
  TuiLineClampModule,
  TuiSelectModule,
  TuiSelectOptionModule,
  TuiToggleModule,
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiColorModule,
  TuiDataListModule,
  TuiHintControllerModule,
  TuiNotificationModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
  TuiWrapperModule,
} from '@taiga-ui/core';
import { ElementControlComponent } from './element-control/element-control.component';
import { TuiElementModule, TuiOverscrollModule } from '@taiga-ui/cdk';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CloserModule } from '@features/directives/closer/closer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { DeviceCommunicationModule } from '@components/share/device-communication/device-communication.module';
import { HelpTextModule } from '@modules/help-text/help-text.module';
import { SensorModule } from '@components/mobile/sensor/sensor.module';
import { DefaultElementControlComponent } from '@components/mobile/mobile-element-control-module/default-element-control/default-element-control.component';

@NgModule({
  declarations: [ElementControlComponent, DefaultElementControlComponent],
  imports: [
    CommonModule,
    MobileElementControlModuleRoutingModule,
    BackButtonModule,
    TuiBadgeModule,
    TuiSvgModule,
    TuiAvatarModule,
    TuiLineClampModule,
    TuiOverscrollModule,
    TuiScrollbarModule,
    DragDropModule,
    FontAwesomeModule,
    CloserModule,
    TuiElementModule,
    TuiInputModule,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiHintControllerModule,
    TuiFieldErrorModule,
    TranslocoModule,
    DeviceCommunicationModule,
    TuiToggleModule,
    HelpTextModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiNotificationModule,
    TuiButtonModule,
    TuiColorModule,
    TuiSelectOptionModule,
    TuiDataListModule,
    TuiInputTagModule,
    TuiWrapperModule,
    SensorModule,
  ],
})
export class MobileElementControlModuleModule {}
