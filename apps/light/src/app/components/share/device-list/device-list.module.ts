import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './device-list/device-list.component';
import { LoadScreenModule } from '@modules/load-screen/load-screen.module';
import { DeviceWidgetsModule } from '@components/share/device-widgets/device-widgets.module';

@NgModule({
  declarations: [DeviceListComponent],
  imports: [CommonModule, LoadScreenModule, DeviceWidgetsModule],
  exports: [DeviceListComponent],
})
export class DeviceListModule {}
