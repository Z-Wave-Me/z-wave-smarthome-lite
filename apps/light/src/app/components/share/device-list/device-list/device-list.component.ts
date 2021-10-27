import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { DevicesState } from '@store/devices/devices.state';
import { Observable, timer } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { RestorePositionService } from '@core/services/restore-position/restore-position.service';

@Component({
  selector: 'z-wave-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class DeviceListComponent implements AfterViewInit {
  @Select(DevicesState.showDevice) ids$!: Observable<string[]>;
  @ViewChild(CdkVirtualScrollViewport) viewport?: CdkVirtualScrollViewport;

  constructor(
    private readonly router: Router,
    private readonly destroyService: DestroyService,
    private readonly restorePositionService: RestorePositionService<
      string,
      number
    >
  ) {
    this.router.events
      .pipe(
        takeUntil(destroyService),
        filter((e) => e instanceof NavigationStart),
        tap((_) => {
          this.restorePositionService.set(
            this.router.url,
            this.viewport?.measureScrollOffset('top') ?? 0
          );
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    // TODO need refactor
    timer(100)
      .pipe(
        tap(() =>
          this.viewport?.scrollTo({
            top: this.restorePositionService.getWithDefault(this.router.url, 0),
          })
        )
      )
      .subscribe();
  }
}
