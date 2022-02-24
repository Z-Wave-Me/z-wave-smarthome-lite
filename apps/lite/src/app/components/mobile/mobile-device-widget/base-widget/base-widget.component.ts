import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { LocationsStateModel } from '@store/locations/locations.state';
import { Store } from '@ngxs/store';
import { Observable, timer } from 'rxjs';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { MobileActionsService } from '@core/services/mobile-actions/mobile-actions.service';
import { ToggleLevel } from '@store/devices/devices.actions';
import { Router } from '@angular/router';

interface Report {
  iconPath: string;
  title: string;
  inProgress: boolean;
  location: number;
  updateTime: number;
  deviceType: string;
  scale?: string;
  level?: number;
}

@Component({
  selector: 'z-wave-base-widget[id]',
  templateUrl: './base-widget.component.html',
  styleUrls: ['./base-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class BaseWidgetComponent implements OnInit {
  @Input() id!: string;
  context$?: Observable<Report>;
  location$?: Observable<string>;
  @ViewChild('widget', { read: ElementRef })
  private readonly widgetRef!: ElementRef;
  constructor(
    private readonly store: Store,
    private readonly destroy$: DestroyService,
    private readonly renderer: Renderer2,
    private readonly mobileActionsService: MobileActionsService,
    private readonly router: Router
  ) {}

  /**
   * Navigate to the element page with the given id
   */
  @HostListener('press', ['$event'])
  press() {
    this.router.navigate(['/element', this.id]);
  }

  /**
   * It dispatches a ToggleLevel action to the store.
   */
  @HostListener('tap')
  tap() {
    this.store.dispatch(new ToggleLevel(this.id));
    this.renderer.addClass(this.widgetRef.nativeElement, 'shake');
    this.mobileActionsService.shotVibrate();
    timer(310).subscribe({
      complete: () =>
        this.renderer.removeClass(this.widgetRef.nativeElement, 'shake'),
    });
  }

  /**
   * It returns a stream of the current context
   */
  ngOnInit(): void {
    this.context$ = this.store.select(
      ({
        devices: {
          entities: { [this.id]: device },
        },
      }): Report => ({
        iconPath: device.iconPath,
        title: device.title,
        inProgress: device.inProgress,
        location: device.location,
        updateTime: device.updateTime * 1e3,
        deviceType: device.deviceType,
        scale: device.metrics.scaleTitle,
        level: device.metrics.level,
      })
    );
    this.location$ = this.context$.pipe(
      filter(({ location }) => location !== 0),
      switchMap(({ location }) =>
        this.store.select(
          ({ locations: { entities } }: { locations: LocationsStateModel }) =>
            entities?.[location].title
        )
      )
    );
  }
}
