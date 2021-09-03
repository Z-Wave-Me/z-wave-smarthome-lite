import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '@modules/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }],
})
export class DialogModule {}
