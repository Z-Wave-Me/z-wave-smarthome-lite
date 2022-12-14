import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileActionsService {
  constructor(@Inject('Window') private readonly window: Window) {}
  /**
   * It vibrates the phone for 100 milliseconds.
   */
  shotVibrate() {
    window.navigator.vibrate(100);
  }
}
