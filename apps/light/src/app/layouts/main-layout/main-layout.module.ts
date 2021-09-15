import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import { ModalWindowModule } from '../../components-old/modal-window/modal-window.module';
import { HeaderModule } from '../../components-old/header/header.module';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    HeaderModule,
    ModalWindowModule,
  ],
  providers: [],
})
export class MainLayoutModule {}
