import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceWidgetComponent } from './device-widget/device-widget.component';

@NgModule({
  declarations: [DeviceWidgetComponent],
  imports: [CommonModule],
  exports: [DeviceWidgetComponent],
})
export class DeviceWidgetsModule {}
