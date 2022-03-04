import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NothingFoundComponent } from './nothing-found/nothing-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [NothingFoundComponent],
  exports: [NothingFoundComponent],
  imports: [CommonModule, FontAwesomeModule, TranslocoModule],
})
export class HelpersModule {}
