import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { pipe } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

/**
 *  When a navigation starts, store the current scroll position of the viewport.
 *  When the router changes, scroll to the last visited page
 */
@Injectable({
  providedIn: 'root',
})
export class RestorePositionService extends Map<string, number> {
  /**
   * If the key is present, return the value. Otherwise, return the default value
   * @param {string} key - The key to look up in the config file.
   * @param {number} byDefault - The default value to return if the key is not found.
   * @returns The value of the key if it exists, otherwise the default value.
   */
  getWithDefault(key: string, byDefault: number) {
    return super.get(key) ?? byDefault;
  }

  /**
   * When a navigation starts, store the current scroll position of the viewport
   * @param {Router} router - Router
   * @param {CdkVirtualScrollViewport} [viewport] - The viewport that is being scrolled.
   * @returns A function that returns a function.
   */
  store(router: Router, viewport?: CdkVirtualScrollViewport) {
    return pipe(
      filter((e) => e instanceof NavigationStart),
      tap(() => {
        this.set(router.url, viewport?.measureScrollOffset('top') ?? 0);
      })
    );
  }

  /**
   * When the router changes, scroll to the last visited page
   * @param {Router} router - Router
   * @param {CdkVirtualScrollViewport} [viewport] - The viewport that is being scrolled.
   */
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
