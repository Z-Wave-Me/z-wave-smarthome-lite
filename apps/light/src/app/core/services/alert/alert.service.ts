import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';

type AlertType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() // private readonly matSnackBar: MatSnackBar
  {}

  success(text: string, title = '', action = ''): void {
    this.message('success', text, title, action);
  }

  error(text: string, title = '', action = ''): void {
    this.message('error', text, title, action);
  }

  warning(text: string, title = '', action = ''): void {
    this.message('warning', text, title, action);
  }

  info(text: string, title = '', action = ''): void {
    this.message('info', text, title, action);
  }

  message(alertType: AlertType, text: string, title = '', action = ''): void {
    // this.matSnackBar.open(text, action, {
    //   horizontalPosition: 'end',
    //   verticalPosition: 'top',
    //   duration: 2 * 1000,
    // });
  }
}
