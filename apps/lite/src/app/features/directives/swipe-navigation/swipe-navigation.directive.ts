import { Directive, HostListener } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { routeOrder } from '../../../layouts/mobile-layout/route-order';

@Directive({
  selector: '[zWaveSwipeNavigation]',
  providers: [DestroyService],
})
export class SwipeNavigationDirective {
  private readonly navigationList = routeOrder;
  private currentRoute = -1;

  constructor(
    private readonly router: Router,
    private readonly destroy$: DestroyService
  ) {
    router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event: Event) => event instanceof NavigationEnd),
        // startWith(this.router.)
        tap(
          (event) =>
            (this.currentRoute = this.navigationList.indexOf(
              (event as NavigationEnd).urlAfterRedirects
            ))
        )
      )
      .subscribe();
  }

  @HostListener('swiperight')
  swipeRight() {
    if (this.currentRoute !== -1 && this.currentRoute > 0) {
      this.router.navigate([this.navigationList[this.currentRoute - 1]]);
    }
  }

  @HostListener('swipeleft')
  swipeLeft() {
    if (
      this.currentRoute !== -1 &&
      this.currentRoute < this.navigationList.length - 1
    ) {
      this.router.navigate([this.navigationList[this.currentRoute + 1]]);
    }
  }
}
