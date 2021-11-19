import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiAvatarModule,
  TuiIslandModule,
  TuiLineClampModule,
} from '@taiga-ui/kit';
import { DeviceWidgetComponent } from '@components/mobile/mobile-device-widget/device-widget.component';
import { BaseWidgetComponent } from './base-widget/base-widget.component';
import { SensorModule } from '@components/mobile/sensor/sensor.module';
import { TuiTouchableModule } from '@taiga-ui/addon-mobile';

@NgModule({
  declarations: [DeviceWidgetComponent, BaseWidgetComponent],
  exports: [DeviceWidgetComponent],
  imports: [
    CommonModule,
    TuiIslandModule,
    TuiAvatarModule,
    TuiLineClampModule,
    SensorModule,
    TuiTouchableModule,
  ],
})
export class MobileDeviceWidgetModule {}
