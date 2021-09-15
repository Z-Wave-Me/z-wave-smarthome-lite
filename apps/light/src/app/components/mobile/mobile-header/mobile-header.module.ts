import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileHeaderComponent } from '@components/mobile/mobile-header/mobile-header.component';
import { TuiTabsModule, TuiToggleModule } from '@taiga-ui/kit';
import { TuiSvgModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MobileHeaderComponent],
  imports: [
    CommonModule,
    TuiTabsModule,
    TuiSvgModule,
    TuiToggleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [MobileHeaderComponent],
})
export class MobileHeaderModule {}
