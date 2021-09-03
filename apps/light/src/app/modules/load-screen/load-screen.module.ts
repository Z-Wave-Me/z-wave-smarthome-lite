import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadScreenComponent } from '@modules/load-screen/load-screen.component';

@NgModule({
  declarations: [LoadScreenComponent],
  imports: [CommonModule],
  exports: [LoadScreenComponent],
})
export class LoadScreenModule {}
