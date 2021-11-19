import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileFooterComponent } from '@components/mobile/mobile-footer/mobile-footer.component';
import { TuiTabsModule } from '@taiga-ui/kit';
import { TuiSvgModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [MobileFooterComponent],
  imports: [
    CommonModule,
    TuiTabsModule,
    TuiSvgModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [MobileFooterComponent],
})
export class MobileFooterModule {}
