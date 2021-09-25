import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSensorComponent } from '@components/mobile/sensor/main-sensor/main-sensor.component';
import { SensorComponent } from './sensor/sensor.component';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MultilevelSensorComponent } from './multilevel-sensor/multilevel-sensor.component';
import { TuiAvatarModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [
    MainSensorComponent,
    SensorComponent,
    MultilevelSensorComponent,
  ],
  exports: [SensorComponent, MultilevelSensorComponent],
  imports: [
    CommonModule,
    TuiScrollbarModule,
    FontAwesomeModule,
    TuiAvatarModule,
  ],
})
export class SensorModule {}
