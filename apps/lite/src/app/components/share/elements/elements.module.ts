import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsSubMenuComponent } from './elements-sub-menu/elements-sub-menu.component';
import { DeviceListModule } from '@components/share/device-list/device-list.module';
import { ElementsRoutingModule } from '@components/share/elements/elements-routing.module';
import { ElementsComponent } from './elements/elements.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiHintControllerModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [ElementsSubMenuComponent, ElementsComponent],
  imports: [
    CommonModule,
    DeviceListModule,
    ElementsRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiHintControllerModule,
    TranslocoModule,
    TuiTextfieldControllerModule,
  ],
})
export class ElementsModule {}
