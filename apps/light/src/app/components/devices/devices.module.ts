import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SecureModule } from '../../features/directives/secure/secure.module';

@NgModule({
  declarations: [DevicesComponent],
  imports: [CommonModule, DevicesRoutingModule, TranslocoModule, SecureModule],
})
export class DevicesModule {}
