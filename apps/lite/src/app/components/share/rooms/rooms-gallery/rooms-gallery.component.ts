import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { EMPTY, Observable, switchMap, timer } from 'rxjs';
import {
  LocationsState,
  LocationsStateModel,
} from '@store/locations/locations.state';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { RestorePositionService } from '@core/services/restore-position/restore-position.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { LocalStorageState } from '@store/local-storage/local-storage.state';

@Component({
  selector: 'z-wave-rooms-gallery',
  templateUrl: './rooms-gallery.component.html',
  styleUrls: ['./rooms-gallery.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsGalleryComponent implements AfterViewInit {
  @Select(LocationsState.ids) ids$!: Observable<number[]>;
  @Select(LocalStorageState.isAdmin) isAdmin!: Observable<boolean>;
  @ViewChild(CdkVirtualScrollViewport)
  viewport?: CdkVirtualScrollViewport;
  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly destroyService: DestroyService,
    private readonly restorePositionService: RestorePositionService
  ) {}

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
