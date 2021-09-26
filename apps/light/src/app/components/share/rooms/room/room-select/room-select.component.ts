import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TuiIdentityMatcher } from '@taiga-ui/cdk';
import { ActivatedRoute } from '@angular/router';

interface SmallRoomInfo {
  id: number;
  title: string;
  imgSrc: string;
  devicesCount: number;
}

@Component({
  selector: 'z-wave-room-select',
  templateUrl: './room-select.component.html',
  styleUrls: ['./room-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomSelectComponent {
  totalRooms$: Observable<SmallRoomInfo[]>;
  currentRoom$: Observable<SmallRoomInfo | undefined>;
  @Input() excludeZero = false;
  @Output() readonly changeRoom = new EventEmitter<number>();
  constructor(
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.currentRoom$ = activatedRoute.url.pipe(
      map(([{ path }]) => +path),
      mergeMap((id) =>
        this.totalRooms$.pipe(map((list) => list?.find((el) => el.id === id)))
      )
    );
    this.totalRooms$ = store.select((state) =>
      Array.from(
        Object.entries<string[]>(state.devices.locations)
          .filter(([id]) => (this.excludeZero ? +id !== 0 : true))
          .map(([id, devices]) => {
            const title = state.locations.entities[id].title as string;
            const imgSrc = state.locations.entities[id].imgSrc as string;
            return {
              id: +id,
              devicesCount: devices.length,
              title,
              imgSrc,
            } as SmallRoomInfo;
          })
      )
    );
  }
  selectRoom({ id }: { id: number }) {
    this.changeRoom.emit(id);
  }
  readonly mather = (e: any, t: any) => e.id === t.id;
}
