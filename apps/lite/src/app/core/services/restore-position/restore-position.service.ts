import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { pipe } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestorePositionService extends Map<string, number> {
  getWithDefault(key: string, byDefault: number) {
    return super.get(key) ?? byDefault;
  }

  store(router: Router, viewport?: CdkVirtualScrollViewport) {
    return pipe(
      filter((e) => e instanceof NavigationStart),
      tap(() => {
        this.set(router.url, viewport?.measureScrollOffset('top') ?? 0);
      })
    );
  }

  restore(router: Router, viewport?: CdkVirtualScrollViewport) {
    setTimeout(
      () =>
        viewport?.scrollTo({
          top: this.getWithDefault(router.url, 0),
        }),
      0
    );
  }
}
