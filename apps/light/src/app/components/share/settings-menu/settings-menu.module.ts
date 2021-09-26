import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsMenuComponent } from '@components/share/settings-menu/settings-menu.component';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownControllerModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TuiToggleModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  exports: [SettingsMenuComponent],
})
export class SettingsMenuModule {}
