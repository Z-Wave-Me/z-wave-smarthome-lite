import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementsRoutingModule } from './elements-routing.module';
import { ElementsComponent } from './elements.component';
import { DeviceListModule } from '@modules/device-list/device-list.module';
import { ElementSubMenuComponent } from './element-sub-menu/element-sub-menu.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SliderModule } from '@modules/slider/slider.module';
import { DropDownModule } from '@modules/drop-down/drop-down.module';
import { ElementSubMenuFilterByTypeComponent } from './element-sub-menu/element-sub-menu-filter-by-type/element-sub-menu-filter-by-type.component';
import { ElementSubMenuFilterByTagComponent } from './element-sub-menu/element-sub-menu-filter-by-tag/element-sub-menu-filter-by-tag.component';
import { ElementSubMenuOrderByComponent } from './element-sub-menu/elenent-sub-menu-order-by/element-sub-menu-order-by.component';
import { ElementSubMenuAutocompleteComponent } from './element-sub-menu/element-sub-menu-autocomplete/element-sub-menu-autocomplete.component';
import { AutocompleteWidgetComponent } from './element-sub-menu/element-sub-menu-autocomplete/autocomplete-widget/autocomplete-widget.component';
import { ElementComponent } from './element/element.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ElementControlModule } from '../element-control/element-control.module';

@NgModule({
  declarations: [
    ElementsComponent,
    ElementSubMenuComponent,
    ElementSubMenuFilterByTypeComponent,
    ElementSubMenuFilterByTagComponent,
    ElementSubMenuOrderByComponent,
    ElementSubMenuAutocompleteComponent,
    AutocompleteWidgetComponent,
    ElementComponent,
  ],
  imports: [
    CommonModule,
    ElementsRoutingModule,
    DeviceListModule,
    TranslocoModule,
    SliderModule,
    DropDownModule,
    FontAwesomeModule,
    ElementControlModule,
  ],
})
export class ElementsModule {}
