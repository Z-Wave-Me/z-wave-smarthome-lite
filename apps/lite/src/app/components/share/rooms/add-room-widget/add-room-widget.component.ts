import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  distinctUntilChanged,
  first,
  pairwise,
  switchMap,
} from 'rxjs/operators';
import { CreateRoom } from '@store/locations/locations.action';
import { LocationsStateModel } from '@store/locations/locations.state';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { TranslocoService } from '@ngneat/transloco';
import { from } from 'rxjs';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';

@Component({
  selector: 'z-wave-add-room-widget',
  templateUrl: './add-room-widget.component.html',
  styleUrls: ['./add-room-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRoomWidgetComponent {
  faPlus = faPlus;
  ready = true;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly tuiNotification: TuiNotificationsService,
    private readonly translocoService: TranslocoService
  ) {}

  @HostListener('press')
  @HostListener('doubletap')
  doubleTap() {
    if (this.ready) {
      this.ready = false;
      this.store
        .select(
          ({ locations: { ids } }: { locations: LocationsStateModel }) => ids
        )
        .pipe(
          distinctUntilChanged(),
          pairwise(),
          first(),
          switchMap(([before, after]) => {
            const [id] = (after ?? []).filter(
              (el) => !(before ?? []).includes(el)
            );
            if (id)
              return from(
                this.router.navigate(['config', id], { relativeTo: this.route })
              ).pipe(
                switchMap(() =>
                  this.tuiNotification.show(
                    this.translocoService.translate<string>(
                      'roomCreateSuccess'
                    ),
                    {
                      status: TuiNotification.Success,
                    }
                  )
                )
              );
            return this.tuiNotification.show(
              this.translocoService.translate<string>('roomCreateError'),
              {
                status: TuiNotification.Error,
              }
            );
          })
        )
        .subscribe({
          complete: () => (this.ready = true),
        });
      const name = this.translocoService.translate<string>('newRoom');
      this.store.dispatch(new CreateRoom(name));
    }
  }
}
