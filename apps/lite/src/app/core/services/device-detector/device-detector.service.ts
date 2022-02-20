import { Inject, Injectable } from '@angular/core';
import { USER_AGENT } from '@ng-web-apis/common';

@Injectable({
  providedIn: 'root',
})
export class DeviceDetectorService {
  readonly isIOS: boolean;
  readonly isAndroid: boolean;
  constructor(@Inject(USER_AGENT) private readonly userAgent: string) {
    this.isAndroid = /\bZ-Way App Android\b.*/.test(this.userAgent);
    this.isIOS = /\bZ-Way App iOS\b.*/.test(this.userAgent);
  }
}
