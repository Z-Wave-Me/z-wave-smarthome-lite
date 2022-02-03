import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileLayoutRoutingModule } from './mobile-layout-routing.module';
import { MobileLayoutComponent } from './mobile-layout/mobile-layout.component';
import { MobileHeaderModule } from '@components/mobile/mobile-header/mobile-header.module';
import { MobileFooterModule } from '@components/mobile/mobile-footer/mobile-footer.module';
import { TuiOverscrollModule } from '@taiga-ui/cdk';
import { MobileTitleService } from '@core/services/mobile-title/mobile-title.service';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { SwipeNavigationModule } from '@features/directives/swipe-navigation/swipe-navigation.module';

@NgModule({
  declarations: [MobileLayoutComponent],
  imports: [
    CommonModule,
    MobileLayoutRoutingModule,
    MobileHeaderModule,
    MobileFooterModule,
    TuiOverscrollModule,
    TuiScrollbarModule,
    SwipeNavigationModule,
  ],
  providers: [MobileTitleService],
})
export class MobileLayoutModule {}
