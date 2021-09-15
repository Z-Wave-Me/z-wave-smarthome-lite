import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementControlRoutingModule } from '../element-control/element-control-routing.module';
import { ElementControlComponent } from '../element-control/element-control.component';
import { DefaultElementControlComponent } from './default-element-control/default-element-control.component';
import { SwitchMultilevelControlComponent } from './switch-multilevel-control/switch-multilevel-control.component';

@NgModule({
  declarations: [
    ElementControlComponent,
    DefaultElementControlComponent,
    SwitchMultilevelControlComponent,
  ],
  imports: [CommonModule, ElementControlRoutingModule],
})
export class ElementControlModule {}
