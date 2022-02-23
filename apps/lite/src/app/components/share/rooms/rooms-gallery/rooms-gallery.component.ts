import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LocationsState } from '@store/locations/locations.state';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { LocalStorageState } from '@store/local-storage/local-storage.state';

@Component({
  selector: 'z-wave-rooms-gallery',
  templateUrl: './rooms-gallery.component.html',
  styleUrls: ['./rooms-gallery.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsGalleryComponent {
  @Select(LocationsState.ids) ids$!: Observable<number[]>;
  @Select(LocalStorageState.isAdmin) isAdmin!: Observable<boolean>;
}
