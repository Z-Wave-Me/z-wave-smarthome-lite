import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloserDirective } from './closer.directive';

@NgModule({
  declarations: [CloserDirective],
  exports: [CloserDirective],
  imports: [CommonModule],
})
export class CloserModule {}
