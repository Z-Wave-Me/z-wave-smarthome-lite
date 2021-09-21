import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceCommutationComponent } from './device-commutation/device-commutation.component';

@NgModule({
  declarations: [DeviceCommutationComponent],
  exports: [DeviceCommutationComponent],
  imports: [CommonModule],
})
export class DeviceCommunicationModule {}
