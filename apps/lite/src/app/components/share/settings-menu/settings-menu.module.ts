import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsMenuComponent } from '@components/share/settings-menu/settings-menu.component';
import { TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiLinkModule, TuiPrimitiveTextfieldModule, TuiSvgModule, TuiTextfieldControllerModule, TuiDropdownModule } from '@taiga-ui/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  TuiAccordionModule,
  TuiIslandModule,
  TuiToggleModule,
} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule, TuiLetModule } from '@taiga-ui/cdk';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';
import { ElementsFiltersComponent } from './elements-filters/elements-filters.component';
import { NotificationFiltersComponent } from './notification-filters/notification-filters.component';

@NgModule({
  declarations: [
    SettingsMenuComponent,
    ElementsFiltersComponent,
    NotificationFiltersComponent,
  ],
  imports: [
    CommonModule,
    TuiHostedDropdownModule,
    TuiSvgModule,
    TuiDataListModule,
    TuiButtonModule,
    TuiDropdownModule,
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
    RouterModule,
    TuiLetModule,
  ],
  exports: [SettingsMenuComponent],
})
export class SettingsMenuModule {}
