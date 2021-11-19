import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from '@components/share/dashboard/dashboard/dashboard.component';
import { DeviceListModule } from '@components/share/device-list/device-list.module';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiButtonModule, TuiLinkModule } from '@taiga-ui/core';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DeviceListModule,
    TranslocoModule,
    TuiButtonModule,
    TuiLinkModule,
  ],
})
export class DashboardModule {}
