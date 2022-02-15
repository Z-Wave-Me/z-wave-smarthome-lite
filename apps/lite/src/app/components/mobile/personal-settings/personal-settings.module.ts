import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalSettingsRoutingModule } from './personal-settings-routing.module';
import { PersonalSettingsComponent } from './personal-settings/personal-settings.component';
import { TranslocoModule } from '@ngneat/transloco';
import {
  TuiBadgeModule,
  TuiDataListWrapperModule,
  TuiFieldErrorModule,
  TuiInputModule,
  TuiIslandModule,
  TuiLineClampModule,
  TuiSelectModule,
  TuiTagModule,
  TuiToggleModule,
} from '@taiga-ui/kit';
import {
  TuiHintControllerModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { BackButtonModule } from '@features/directives/back-button/back-button.module';
import { TuiForModule, TuiOverscrollModule } from '@taiga-ui/cdk';
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
    TuiHintControllerModule,
    TuiFieldErrorModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiIslandModule,
    TuiToggleModule,
    FontAwesomeModule,
    TuiTagModule,
  ],
})
export class PersonalSettingsModule {}
