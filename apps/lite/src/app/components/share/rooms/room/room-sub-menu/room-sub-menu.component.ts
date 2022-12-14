import { Component, Input, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import {
  exhaustMap,
  filter,
  first,
  map,
  mergeMap,
  switchMap,
  toArray,
} from 'rxjs/operators';
import { ActivatedRoute, Route, Router } from '@angular/router';

interface RoomInfo {
  imgSrc: string;
  title: string;
  mainSensors: string[];
}

@Component({
  selector: 'z-wave-room-sub-menu',
  templateUrl: './room-sub-menu.component.html',
  styleUrls: ['./room-sub-menu.component.scss'],
})
export class RoomSubMenuComponent {
  info$: Observable<RoomInfo>;
  id?: number;
  constructor(
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.info$ = activatedRoute.url.pipe(
      map(([{ path }]) => {
        this.id = +path;
        return path;
      }),
      switchMap((location) =>
        store.select((state) => state.locations.entities[location])
      ),
      filter((data) => !!data),
      map(({ imgSrc, title, main_sensors: mainSensors }) => ({
        imgSrc,
        title,
        mainSensors,
      }))
    );
  }
  changeRoom(id: number) {
    this.router.navigate(['..', id], { relativeTo: this.activatedRoute });
  }
}
