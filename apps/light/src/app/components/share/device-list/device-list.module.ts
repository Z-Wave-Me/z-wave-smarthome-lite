import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './device-list/device-list.component';
import { LoadScreenModule } from '@modules/load-screen/load-screen.module';
import { MobileDeviceWidgetModule } from '@components/mobile/mobile-device-widget/mobile-device-widget.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [DeviceListComponent],
  imports: [
    CommonModule,
    LoadScreenModule,
    MobileDeviceWidgetModule,
    DragDropModule,
  ],
  exports: [DeviceListComponent],
})
export class DeviceListModule {}
