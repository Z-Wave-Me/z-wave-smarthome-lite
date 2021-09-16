import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, startWith } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'any',
})
export class MobileTitleService {
  constructor(private readonly route: Router) {
    console.log('MobileTitleService created');
  }
  title(): Observable<string> {
    return this.route.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((data) => (data as NavigationEnd).url),
      startWith(this.route.url)
    );
  }
}
