import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalSettingsRoutingModule } from './personal-settings-routing.module';
import { PersonalSettingsComponent } from '../personal-settings/personal-settings.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [PersonalSettingsComponent],
  imports: [CommonModule, PersonalSettingsRoutingModule, TranslocoModule],
})
export class PersonalSettingsModule {}
