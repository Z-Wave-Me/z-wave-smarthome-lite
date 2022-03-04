import { Inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BackgroundModeService implements OnDestroy {
  private static readonly IDLE_TIME = 1_800_000;
  // private static readonly IDLE_TIME = 5_000;
  private reload = false;
  private readonly subscription: Subscription;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.subscription = fromEvent(document, 'visibilitychange')
      .pipe(
        tap(() => {
          if (document.visibilityState === 'visible') {
            console.log('Page visible. Reload trigger: ', this.reload);
            if (this.reload) {
              this.reload = false;
              this.document.location.reload();
            }
          } else {
            console.log('Page hidden. Reload trigger: ', this.reload);
          }
        }),
        debounceTime(BackgroundModeService.IDLE_TIME),
        tap(() => {
          if (document.visibilityState === 'hidden') {
            this.reload = true;
            console.log('page hidden and triggered reload');
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
