import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}
  get(key: string) {
    const cookie = this.document.cookie
      .split(';')
      .find((item) => item.trim().startsWith(key + '='));
    if (cookie) return cookie.split('=')[1];
    return cookie;
  }
}
