import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstAccessRoutingModule } from './first-access-routing.module';
import { FirstAccessComponent } from './first-access/first-access.component';


@NgModule({
  declarations: [
    FirstAccessComponent
  ],
  imports: [
    CommonModule,
    FirstAccessRoutingModule
  ]
})
export class FirstAccessModule { }
