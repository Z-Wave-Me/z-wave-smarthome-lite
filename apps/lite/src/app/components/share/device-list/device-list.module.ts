import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './device-list/device-list.component';
import { LoadScreenModule } from '@modules/load-screen/load-screen.module';
import { MobileDeviceWidgetModule } from '@components/mobile/mobile-device-widget/mobile-device-widget.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { RestorePositionModule } from '@features/directives/restore-position/restore-position.module';

@NgModule({
  declarations: [DeviceListComponent],
  imports: [
    CommonModule,
    LoadScreenModule,
    MobileDeviceWidgetModule,
    DragDropModule,
    ScrollingModule,
    TuiScrollbarModule,
    RestorePositionModule,
  ],
  exports: [DeviceListComponent],
})
export class DeviceListModule {}
