import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandSettingsComponent } from './expand-settings/expand-settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ExpandSettingsComponent],
  exports: [ExpandSettingsComponent],
  imports: [CommonModule, FontAwesomeModule],
})
export class ExpandSettingsModule {}
