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

@NgModule({
  declarations: [SettingsMenuComponent],
  imports: [
    CommonModule,
    TuiHostedDropdownModule,
    TuiSvgModule,
    TuiDataListModule,
    TuiButtonModule,
    TuiDropdownControllerModule,
  ],
  exports: [SettingsMenuComponent],
})
export class SettingsMenuModule {}
