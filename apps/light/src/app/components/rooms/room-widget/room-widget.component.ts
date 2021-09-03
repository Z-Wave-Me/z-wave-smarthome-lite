import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Location } from '@store/locations/location';

@Component({
  selector: 'z-wave-room-widget[id]',
  templateUrl: './room-widget.component.html',
  styleUrls: ['./room-widget.component.scss'],
})
export class RoomWidgetComponent implements OnInit {
  @Input() id!: number;
  readonly locations$: Observable<any>;
  readonly room$: Observable<Location>;

  constructor(private store: Store) {
    this.room$ = store.select((state) => state.locations.entities[this.id]);
    this.locations$ = store.select((state) => state.devices.locations[this.id]);
  }

  ngOnInit(): void {}
}
