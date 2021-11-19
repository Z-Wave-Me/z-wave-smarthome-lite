import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsSubMenuComponent } from './elements-sub-menu/elements-sub-menu.component';
import { DeviceListModule } from '@components/share/device-list/device-list.module';
import { ElementsRoutingModule } from '@components/share/elements/elements-routing.module';
import { ElementsComponent } from './elements/elements.component';

@NgModule({
  declarations: [ElementsSubMenuComponent, ElementsComponent],
  imports: [CommonModule, DeviceListModule, ElementsRoutingModule],
  exports: [ElementsSubMenuComponent],
})
export class ElementsModule {}
