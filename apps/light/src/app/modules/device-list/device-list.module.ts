import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './device-list.component';
import { WidgetModule } from '@modules/widget/widget.module';
import { LoadScreenModule } from '@modules/load-screen/load-screen.module';

@NgModule({
  declarations: [DeviceListComponent],
  imports: [CommonModule, WidgetModule, LoadScreenModule],
  exports: [DeviceListComponent],
})
export class DeviceListModule {
  constructor() {}
}
