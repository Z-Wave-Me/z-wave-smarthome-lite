import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './device-list/device-list.component';
import { LoadScreenModule } from '@modules/load-screen/load-screen.module';
import { MobileDeviceWidgetModule } from '@components/mobile/mobile-device-widget/mobile-device-widget.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TuiScrollbarModule } from '@taiga-ui/core';

@NgModule({
  declarations: [DeviceListComponent],
  imports: [
    CommonModule,
    LoadScreenModule,
    MobileDeviceWidgetModule,
    DragDropModule,
    ScrollingModule,
    TuiScrollbarModule,
  ],
  exports: [DeviceListComponent],
})
export class DeviceListModule {}
