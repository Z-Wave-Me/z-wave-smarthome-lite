import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyLayoutComponent } from './empty-layout.component';
import { EmptyLayoutRoutingModule } from './empty-layout-routing.module';

@NgModule({
  declarations: [EmptyLayoutComponent],
  imports: [CommonModule, EmptyLayoutRoutingModule],
  exports: [EmptyLayoutComponent],
})
export class EmptyLayoutModule {}
