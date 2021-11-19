import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWidgetComponent } from './base-widget/base-widget.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SecureModule } from '@features/directives/secure/secure.module';
import { RouterModule } from '@angular/router';
import { TimeAgoModule } from '../../features/pipes/time-ago/time-ago.module';
import { AutoFontSizeModule } from '@features/directives/auto-font-size/auto-font-size.module';

import { BaseWidgetMobileComponent } from './base-widget-mobile/base-widget-mobile.component';
import { DefaultWidgetComponent } from './custom-widgets/default-widget/default-widget.component';
import { WidgetHeaderComponent } from './widget-header/widget-header.component';
import { SwitchMultilevelWidgetComponent } from './custom-widgets/switch-multilevel-widget/switch-multilevel-widget.component';
import { SwitchBinaryWidgetComponent } from './custom-widgets/switch-binary-widget/switch-binary-widget.component';
import { SwitchRGBWWidgetComponent } from './custom-widgets/switch-r-g-b-w-widget/switch-r-g-b-w-widget.component';
import { SensorMultilevelWidgetComponent } from './custom-widgets/sensor-multilevel-widget/sensor-multilevel-widget.component';
import { WidgetComponent } from '@modules/widget/widget.component';

@NgModule({
  declarations: [
    BaseWidgetComponent,
    WidgetComponent,
    BaseWidgetMobileComponent,
    WidgetHeaderComponent,
    DefaultWidgetComponent,
    SwitchMultilevelWidgetComponent,
    SwitchBinaryWidgetComponent,
    SwitchRGBWWidgetComponent,
    SensorMultilevelWidgetComponent,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    SecureModule,
    RouterModule,
    TimeAgoModule,
    AutoFontSizeModule,
  ],
  exports: [WidgetComponent],
})
export class WidgetModule {}
