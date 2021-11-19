import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'z-wave-room-widget-sensor[id]',
  templateUrl: './room-widget-sensor.component.html',
  styleUrls: ['./room-widget-sensor.component.scss'],
})
export class RoomWidgetSensorComponent implements OnInit {
  @Input() id!: string;
  readonly device$: Observable<{ [key: string]: string | number }>;

  constructor(private readonly store: Store) {
    this.device$ = store
      .select((state) => state.devices.entities[this.id])
      .pipe(
        filter((device) => !!device),
        map(({ metrics, iconPath }) => ({ ...metrics, iconPath }))
      );
  }

  ngOnInit(): void {}
}
