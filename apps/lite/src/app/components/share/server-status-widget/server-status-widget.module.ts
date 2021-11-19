import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeverStatusWidgetComponent } from './sever-status-widget/sever-status-widget.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [SeverStatusWidgetComponent],
  exports: [SeverStatusWidgetComponent],
  imports: [CommonModule, FontAwesomeModule],
})
export class ServerStatusWidgetModule {}
