import { AfterViewInit, Directive } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, first, tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { StorePosition } from '@store/locals/locals.actions';
import { LocalsState } from '@store/locals/locals.state';

@Directive({
  selector: '[zWaveRestorePosition]',
})
export class RestorePositionDirective implements AfterViewInit {
  constructor(
    private readonly viewport: CdkVirtualScrollViewport,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationStart),
        first(),
        tap(() => {
          this.store.dispatch(
            new StorePosition(router.url, viewport?.measureScrollOffset('top'))
          );
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.viewport?.scrollTo({
        top: this.store.selectSnapshot(LocalsState.position(this.router.url)),
      });
      this.viewport.checkViewportSize();
    }, 0);
  }
}
