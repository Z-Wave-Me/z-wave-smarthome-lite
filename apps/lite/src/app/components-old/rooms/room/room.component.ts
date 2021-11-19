import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  filter,
  finalize,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { SetOrder, UpdateFilter } from '@store/filter/filter.actions';

interface RoomInfo {
  title: string;
  id: number;
  imgSrc: string;
}

@Component({
  selector: 'z-wave-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  providers: [DestroyService],
})
export class RoomComponent implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store,
    private readonly destroy$: DestroyService
  ) {
    this.store.dispatch(new SetOrder('rooms'));
    activatedRoute.url
      .pipe(
        takeUntil(destroy$),
        tap(([{ path }]) => {
          this.store.dispatch(new UpdateFilter({ location: +path }));
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
