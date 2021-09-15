import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter, map, switchMap } from 'rxjs/operators';
import { DevicesStateModel } from '@store/devices/devices.state';
import { Observable } from 'rxjs';
import { LocationsStateModel } from '@store/locations/locations.state';

interface Record {
  title: string;
  roomTitle?: string;
  level: number;
  iconPath: string;
  id: string;
}

@Component({
  selector: 'z-wave-switch-multilevel-control',
  templateUrl: './switch-multilevel-control.component.html',
  styleUrls: ['./switch-multilevel-control.component.scss'],
})
export class SwitchMultilevelControlComponent implements OnInit {
  data$: Observable<Record>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly store: Store,
  ) {
    this.data$ = activatedRoute.params.pipe(
      switchMap(({ id }) =>
        store.select(
          ({
            devices: { entities },
            locations: { entities: locate },
          }: {
            devices: DevicesStateModel;
            locations: LocationsStateModel;
          }) => ({
            ...entities[id],
            location: locate?.[entities[id].location]?.title,
          }),
        ),
      ),
      filter((entry) => !!entry),
      map((device) => ({
        title: device.title,
        roomTitle: typeof device.location === 'string' ? device.location : undefined,
        level: +device.metrics.level,
        iconPath: device.iconPath,
        id: device.id,
      })),
    );
  }

  ngOnInit(): void {}
}
