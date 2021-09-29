import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
} from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Store } from '@ngxs/store';
import { Location } from '@store/locations/location';
import { faSort } from '@fortawesome/pro-light-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'z-wave-room-widget[id]',
  templateUrl: './room-widget.component.html',
  styleUrls: ['./room-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomWidgetComponent {
  @Input() id!: number;
  readonly faSort = faSort;
  readonly locations$: Observable<any>;
  readonly room$: Observable<Location>;

  constructor(
    private store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.room$ = store.select((state) => state.locations.entities[this.id]);
    this.locations$ = store.select((state) => state.devices.locations[this.id]);
  }

  @HostListener('doubletap')
  doubleTap() {
    this.router.navigate(['config', this.id], { relativeTo: this.route });
  }

  @HostListener('press')
  press() {
    this.locations$
      .pipe(
        map((loc) => loc?.length),
        switchMap((count) =>
          count
            ? this.router.navigate([this.id], { relativeTo: this.route })
            : this.router.navigate(['config', this.id], {
                relativeTo: this.route,
              })
        ),
        first()
      )
      .subscribe();
  }

  trackIndex(index: number) {
    return index;
  }
}
