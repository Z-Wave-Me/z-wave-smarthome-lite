import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MainLayoutRoutingModule } from '../../layouts/main-layout/main-layout-routing.module';
import { SecureModule } from '../../features/directives/secure/secure.module';
import { DropDownModule } from '@modules/drop-down/drop-down.module';
import { LabelModule } from '../../features/directives/label/label.module';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, TranslocoModule, MainLayoutRoutingModule, SecureModule, DropDownModule, LabelModule],
})
export class HeaderModule {}
