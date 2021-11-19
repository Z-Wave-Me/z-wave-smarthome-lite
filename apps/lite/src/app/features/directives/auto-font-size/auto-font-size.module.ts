import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoFontSizeDirective } from './auto-font-size.directive';

@NgModule({
  declarations: [AutoFontSizeDirective],
  imports: [CommonModule],
  exports: [AutoFontSizeDirective],
})
export class AutoFontSizeModule {}
