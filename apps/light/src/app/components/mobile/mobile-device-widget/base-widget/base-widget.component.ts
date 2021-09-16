import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  concatMap,
  delay,
  filter,
  first,
  map,
  mapTo,
  mergeMap,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs/operators';
import { LocationsStateModel } from '@store/locations/locations.state';
import { Store } from '@ngxs/store';
import { fromEvent, merge, Observable, timer } from 'rxjs';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { MobileActionsService } from '@core/services/mobile-actions/mobile-actions.service';
import { ToggleLevel } from '@store/devices/devices.actions';

interface Report {
  iconPath: string;
  title: string;
  inProgress: boolean;
  location: number;
  updateTime: number;
}

@Component({
  selector: 'z-wave-base-widget[id]',
  templateUrl: './base-widget.component.html',
  styleUrls: ['./base-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class BaseWidgetComponent {
  @ViewChild('widget', { read: ElementRef })
  private readonly elementRef!: ElementRef;
  @Input() id!: string;
  context$: Observable<Report>;
  location$: Observable<string>;
  constructor(
    private readonly store: Store,
    private readonly destroy$: DestroyService,
    private renderer: Renderer2,
    private readonly mobileActionsService: MobileActionsService
  ) {
    this.context$ = store.select(
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
      })
    );
    this.location$ = this.context$.pipe(
      filter(({ location }) => location !== 0),
      switchMap(({ location }) =>
        store.select(
          ({ locations: { entities } }: { locations: LocationsStateModel }) =>
            entities?.[location].title
        )
      )
    );
  }
  @HostListener('swiperight')
  swipeRight() {
    console.log('swipeRight');
  }
  @HostListener('doubletap', ['$event'])
  doubleTap(event: TouchEvent) {
    console.log('doubleTap', event.type, event);
  }
  @HostListener('press')
  press() {
    this.store.dispatch(new ToggleLevel(this.id));
    this.renderer.addClass(this.elementRef.nativeElement, 'shake');
    this.mobileActionsService.shotVibrate();
    timer(310).subscribe({
      complete: () =>
        this.renderer.removeClass(this.elementRef.nativeElement, 'shake'),
    });
    console.log('press');
  }
  @HostListener('touchend')
  cancel() {
    this.renderer.removeClass(this.elementRef.nativeElement, 'dirty');
  }
  @HostListener('touchstart')
  start() {
    this.renderer.addClass(this.elementRef.nativeElement, 'dirty');
  }
}
