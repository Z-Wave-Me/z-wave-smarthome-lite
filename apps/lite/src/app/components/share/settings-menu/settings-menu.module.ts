import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsMenuComponent } from '@components/share/settings-menu/settings-menu.component';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownControllerModule,
  TuiHostedDropdownModule,
  TuiLinkModule,
  TuiPrimitiveTextfieldModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  TuiAccordionModule,
  TuiIslandModule,
  TuiToggleModule,
} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [SettingsMenuComponent],
  imports: [
    CommonModule,
    TuiHostedDropdownModule,
    TuiSvgModule,
    TuiDataListModule,
    TuiButtonModule,
    TuiDropdownControllerModule,
    FontAwesomeModule,
    TuiToggleModule,
    ReactiveFormsModule,
    TuiAccordionModule,
    TuiLinkModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiAccordionModule,
    TranslocoModule,
    TuiPrimitiveTextfieldModule,
    TuiTextfieldControllerModule,
    TuiIslandModule,
  ],
  exports: [SettingsMenuComponent],
})
export class SettingsMenuModule {}
