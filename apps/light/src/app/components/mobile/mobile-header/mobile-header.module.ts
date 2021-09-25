import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileHeaderComponent } from '@components/mobile/mobile-header/mobile-header.component';
import { TuiTabsModule, TuiToggleModule } from '@taiga-ui/kit';
import { TuiSvgModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsMenuModule } from '@components/share/settings-menu/settings-menu.module';
import { ServerStatusWidgetModule } from '@components/share/server-status-widget/server-status-widget.module';

@NgModule({
  declarations: [MobileHeaderComponent],
  imports: [
    CommonModule,
    TuiTabsModule,
    TuiSvgModule,
    TuiToggleModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsMenuModule,
    ServerStatusWidgetModule,
  ],
  exports: [MobileHeaderComponent],
})
export class MobileHeaderModule {}