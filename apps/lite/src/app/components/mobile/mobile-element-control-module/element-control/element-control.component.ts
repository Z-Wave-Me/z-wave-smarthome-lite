import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { DevicesStateModel } from '@store/devices/devices.state';
import { LocationsStateModel } from '@store/locations/locations.state';
import { ExcludeDevice } from '@components/mobile/mobile-element-control-module/interfaces';
import { Device } from '@store/devices/deviceInterface';

@Component({
  selector: 'z-wave-element-control',
  templateUrl: './element-control.component.html',
  styleUrls: ['./element-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementControlComponent implements OnInit {
  // private static readonly componentList: { [index: string]: any } = {
  //   switchMultilevel: MainSensorComponent,
  //   switchBinary: MainSensorComponent,
  //   sensorBinary: MainSensorComponent,
  // };
  context$?: Observable<Device & ExcludeDevice>;
  // @ViewChild('control', { static: true, read: ViewContainerRef })
  // control: any;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.context$ = this.activatedRoute.params.pipe(
      switchMap(({ id }) =>
        this.store.select(
          ({
            devices: { entities },
            locations: { entities: locate, ids },
          }: {
            devices: DevicesStateModel;
            locations: LocationsStateModel;
          }): Device & ExcludeDevice => ({
            ...entities[id],
            location: {
              id: entities[id].location,
              name: locate?.[entities[id].location]?.title,
              url: locate?.[entities[id].location]?.imgSrc,
            },
            locations: ids?.map((id) => ({
              id,
              name: locate[id].title,
              url: locate[id].imgSrc,
            })),
          })
        )
      ),
      filter((entry) => {
        if (!entry) this.router.navigate(['/elements']);
        return !!entry;
      })
    );
  }
}
