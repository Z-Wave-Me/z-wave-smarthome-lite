import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeverStatusWidgetComponent } from './sever-status-widget/sever-status-widget.component';

@NgModule({
  declarations: [SeverStatusWidgetComponent],
  exports: [SeverStatusWidgetComponent],
  imports: [CommonModule],
})
export class ServerStatusWidgetModule {}
