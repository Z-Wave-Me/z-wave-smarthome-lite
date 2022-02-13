import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { DevicesState } from '@store/devices/devices.state';
import { EMPTY, Observable, switchMap, timer } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
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
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewport?: CdkVirtualScrollViewport;
  constructor(
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
