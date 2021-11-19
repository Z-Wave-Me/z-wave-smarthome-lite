import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwipeNavigationDirective } from '@features/directives/swipe-navigation/swipe-navigation.directive';

@NgModule({
  declarations: [SwipeNavigationDirective],
  imports: [CommonModule],
  exports: [SwipeNavigationDirective],
})
export class SwipeNavigationModule {}
