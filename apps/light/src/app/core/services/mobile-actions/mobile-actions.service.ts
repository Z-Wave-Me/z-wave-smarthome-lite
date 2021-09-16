import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileActionsService {
  constructor(@Inject('Window') private readonly window: Window) {}
  shotVibrate() {
    window.navigator.vibrate(100);
  }
}
