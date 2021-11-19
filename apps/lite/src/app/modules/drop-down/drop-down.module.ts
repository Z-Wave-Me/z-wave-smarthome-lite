import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownComponent } from './drop-down.component';
import { DropDownHeadComponent } from './drop-down-head/drop-down-head.component';
import { DropDownContentComponent } from './drop-down-content/drop-down-content.component';

@NgModule({
  declarations: [
    DropDownComponent,
    DropDownHeadComponent,
    DropDownContentComponent,
  ],
  exports: [DropDownComponent, DropDownHeadComponent, DropDownContentComponent],
  imports: [CommonModule],
})
export class DropDownModule {}
