import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementConfigRoutingModule } from './element-config-routing.module';
import { ElementConfigComponent } from '../../elements/element-config/element-config.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SecureModule } from '../../../features/directives/secure/secure.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelpTextModule } from '@modules/help-text/help-text.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [ElementConfigComponent],
  imports: [
    CommonModule,
    ElementConfigRoutingModule,
    TranslocoModule,
    SecureModule,
    FormsModule,
    HelpTextModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
})
export class ElementConfigModule {}
