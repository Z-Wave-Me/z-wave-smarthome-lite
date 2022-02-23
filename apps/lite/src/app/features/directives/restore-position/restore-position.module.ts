import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestorePositionDirective } from './restore-position.directive';

@NgModule({
  declarations: [RestorePositionDirective],
  imports: [CommonModule],
  exports: [RestorePositionDirective],
})
export class RestorePositionModule {}
