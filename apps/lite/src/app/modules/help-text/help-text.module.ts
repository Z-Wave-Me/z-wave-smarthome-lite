import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpTextComponent } from './help-text.component';

@NgModule({
  declarations: [HelpTextComponent],
  exports: [HelpTextComponent],
  imports: [CommonModule],
})
export class HelpTextModule {}
