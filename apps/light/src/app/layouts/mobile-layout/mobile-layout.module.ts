import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileLayoutRoutingModule } from './mobile-layout-routing.module';
import { MobileLayoutComponent } from './mobile-layout/mobile-layout.component';
import { MobileHeaderModule } from '@components/mobile/mobile-header/mobile-header.module';
import { MobileFooterModule } from '@components/mobile/mobile-footer/mobile-footer.module';
import { TuiOverscrollModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [MobileLayoutComponent],
  imports: [
    CommonModule,
    MobileLayoutRoutingModule,
    MobileHeaderModule,
    MobileFooterModule,
    TuiOverscrollModule,
  ],
  bootstrap: [MobileLayoutComponent],
})
export class MobileLayoutModule {}
