import { Component, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Location } from '@store/locations/location';

@Component({
  selector: 'z-wave-room-widget[id]',
  templateUrl: './room-widget.component.html',
  styleUrls: ['./room-widget.component.scss'],
})
export class RoomWidgetComponent {
  @Input() id!: number;
  readonly locations$: Observable<any>;
  readonly room$: Observable<Location>;

  constructor(private store: Store) {
    this.room$ = store.select((state) => state.locations.entities[this.id]);
    this.locations$ = store.select((state) => state.devices.locations[this.id]);
  }

  @HostListener('doubletap')
  doubleTap() {
    console.log(this.id);
  }

  @HostListener('press')
  press() {
    console.log(this.id, 'press');
  }
}
