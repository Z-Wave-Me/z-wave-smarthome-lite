import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { DeviceListModule } from '@modules/device-list/device-list.module';
import { LoadScreenModule } from '@modules/load-screen/load-screen.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, DeviceListModule, LoadScreenModule, TranslocoModule],
})
export class DashboardModule {}
