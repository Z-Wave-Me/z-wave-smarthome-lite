import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileFooterComponent } from '@components/mobile/mobile-footer/mobile-footer.component';

@NgModule({
  declarations: [MobileFooterComponent],
  imports: [CommonModule],
  exports: [MobileFooterComponent],
})
export class MobileFooterModule {}
