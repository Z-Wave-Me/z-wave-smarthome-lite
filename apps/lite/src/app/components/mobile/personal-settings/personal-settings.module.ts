import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalSettingsRoutingModule } from './personal-settings-routing.module';
import { PersonalSettingsComponent } from './personal-settings/personal-settings.component';
import { TranslocoModule } from '@ngneat/transloco';
import {
  TuiBadgeModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiIslandModule,
  TuiLineClampModule,
  TuiSelectModule,
  TuiTagModule,
  TuiToggleModule,
  TuiFieldErrorPipeModule,
} from '@taiga-ui/kit';
import {
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
  TuiHintModule,
  TuiErrorModule,
} from '@taiga-ui/core';
import { BackButtonModule } from '@features/directives/back-button/back-button.module';
import { TuiOverscrollModule } from '@taiga-ui/cdk';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [PersonalSettingsComponent],
  imports: [
    CommonModule,
    PersonalSettingsRoutingModule,
    TranslocoModule,
    TuiLineClampModule,
    TuiBadgeModule,
    TuiSvgModule,
    BackButtonModule,
    TuiScrollbarModule,
    TuiOverscrollModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiHintModule,
    TuiFieldErrorPipeModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiIslandModule,
    TuiToggleModule,
    FontAwesomeModule,
    TuiTagModule,
    TuiErrorModule,
  ],
})
export class PersonalSettingsModule {}
