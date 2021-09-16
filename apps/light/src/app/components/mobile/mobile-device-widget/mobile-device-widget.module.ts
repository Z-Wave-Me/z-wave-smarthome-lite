import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiAvatarModule,
  TuiIslandModule,
  TuiLineClampModule,
} from '@taiga-ui/kit';
import { DeviceWidgetComponent } from '@components/mobile/mobile-device-widget/device-widget.component';
import { BaseWidgetComponent } from './base-widget/base-widget.component';

@NgModule({
  declarations: [DeviceWidgetComponent, BaseWidgetComponent],
  exports: [DeviceWidgetComponent],
  imports: [CommonModule, TuiIslandModule, TuiAvatarModule, TuiLineClampModule],
})
export class MobileDeviceWidgetModule {}
