import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { LocalsStateModel } from '@store/locals/locals.state';
import { LocationsStateModel } from '@store/locations/locations.state';

interface Report {
  iconPath: string;
  title: string;
  inProgress: boolean;
  location: number;
  updateTime: number;
}
@Component({
  selector: 'z-wave-base-widget[id]',
  templateUrl: './base-widget.component.html',
  styleUrls: ['./base-widget.component.scss'],
})
export class BaseWidgetComponent implements OnInit {
  @Input() id!: string;
  data$: Observable<Report>;
  location$: Observable<string | undefined>;
  constructor(private store: Store) {
    this.data$ = store.select(
      ({
        devices: {
          entities: { [this.id]: device },
        },
      }): Report => ({
        iconPath: device.iconPath,
        title: device.title,
        inProgress: device.inProgress,
        location: device.location,
        updateTime: device.updateTime * 1e3,
      }),
    );
    this.location$ = this.data$.pipe(
      filter(({ location }) => location !== 0),
      switchMap(({ location }) =>
        store.select(({ locations: { entities } }: { locations: LocationsStateModel }) => entities?.[location].title),
      ),
    );
  }
  ngOnInit(): void {}
}
