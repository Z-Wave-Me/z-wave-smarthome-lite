import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, startWith, switchMap } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { routeOrder } from '../../../layouts/mobile-layout/route-order';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngxs/store';
import { LocationsStateModel } from '@store/locations/locations.state';

@Injectable({
  providedIn: 'any',
})
export class MobileTitleService {
  constructor(
    private readonly route: Router,
    private readonly translocoService: TranslocoService,
    private readonly store: Store
  ) {}
  title$(): Observable<string> {
    return this.route.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((data) => (data as NavigationEnd).url),
      startWith(this.route.url),
      switchMap((route) => {
        if (routeOrder.includes(route)) {
          return this.translocoService.selectTranslate<string>(route.slice(1));
        }
        return this.store.select(
          ({ locations: { entities } }: { locations: LocationsStateModel }) =>
            entities[+(route.split('/').pop() ?? 0)].title
        );
      })
    );
  }
}
