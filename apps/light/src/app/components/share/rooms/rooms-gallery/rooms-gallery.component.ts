import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LocationsStateModel } from '@store/locations/locations.state';

@Component({
  selector: 'z-wave-rooms-gallery',
  templateUrl: './rooms-gallery.component.html',
  styleUrls: ['./rooms-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsGalleryComponent {
  readonly ids$: Observable<number[]>;

  constructor(private readonly store: Store) {
    this.ids$ = store.select(
      ({ locations: { ids } }: { locations: LocationsStateModel }) =>
        ids.filter((id) => id)
    );
  }
}
