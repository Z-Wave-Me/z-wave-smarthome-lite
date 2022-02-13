import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { EMPTY, Observable, switchMap, timer } from 'rxjs';
import { LocationsStateModel } from '@store/locations/locations.state';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { RestorePositionService } from '@core/services/restore-position/restore-position.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DestroyService } from '@core/services/destroy/destroy.service';

@Component({
  selector: 'z-wave-rooms-gallery',
  templateUrl: './rooms-gallery.component.html',
  styleUrls: ['./rooms-gallery.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsGalleryComponent implements AfterViewInit {
  readonly ids$: Observable<number[] | undefined>;
  @ViewChild(CdkVirtualScrollViewport) viewport?: CdkVirtualScrollViewport;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly destroyService: DestroyService,
    private readonly restorePositionService: RestorePositionService
  ) {
    this.ids$ = store.select(
      ({ locations: { ids } }: { locations: LocationsStateModel }) =>
        ids ? [...ids].reverse() : ids
    );
  }

  ngAfterViewInit(): void {
    this.restorePositionService.restore(this.router, this.viewport);
    this.router.events
      .pipe(
        takeUntil(this.destroyService),
        this.restorePositionService.store(this.router, this.viewport)
      )
      .subscribe();
  }
}
