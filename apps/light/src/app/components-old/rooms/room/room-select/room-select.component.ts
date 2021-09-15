import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

interface SmallRoomInfo {
  id: string;
  title: Observable<string>;
  imgSrc: Observable<string>;
  devicesCount: number;
}

@Component({
  selector: 'z-wave-room-select',
  templateUrl: './room-select.component.html',
  styleUrls: ['./room-select.component.scss'],
})
export class RoomSelectComponent implements OnInit {
  totalRooms$: Observable<SmallRoomInfo[]>;

  constructor(private readonly store: Store) {
    this.totalRooms$ = store
      .select((state) => state.devices.locations)
      .pipe(
        map((data: { [key: number]: string[] }) => {
          return Object.entries(data).map(([id, devices]) => {
            const title = this.store.select((state) => state.locations.entities[id].title);
            const imgSrc = this.store.select((state) => state.locations.entities[id].imgSrc);
            return { id, devicesCount: devices.length, title, imgSrc };
          });
        }),
      );
  }

  ngOnInit(): void {}
}
