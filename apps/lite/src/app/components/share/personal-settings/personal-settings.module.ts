import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalSettingsRoutingModule } from './personal-settings-routing.module';
import { PersonalSettingsComponent } from './personal-settings/personal-settings.component';

@NgModule({
  declarations: [PersonalSettingsComponent],
  imports: [CommonModule, PersonalSettingsRoutingModule],
})
export class PersonalSettingsModule {}
