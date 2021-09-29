import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { DevicesStateModel } from '@store/devices/devices.state';
import { LocationsStateModel } from '@store/locations/locations.state';
import { ExcludeDevice } from '@components/mobile/mobile-element-control-module/interfaces';
import { MainSensorComponent } from '@components/mobile/sensor/main-sensor/main-sensor.component';
import { Device } from '@store/devices/deviceInterface';

@Component({
  selector: 'z-wave-element-control',
  templateUrl: './element-control.component.html',
  styleUrls: ['./element-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementControlComponent {
  private static readonly componentList: { [index: string]: any } = {
    switchMultilevel: MainSensorComponent,
    switchBinary: MainSensorComponent,
    sensorBinary: MainSensorComponent,
  };
  context$: Observable<Device & ExcludeDevice>;
  // @ViewChild('control', { static: true, read: ViewContainerRef })
  // control: any;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly store: Store,
    private readonly router: Router
  ) {
    this.context$ = activatedRoute.params.pipe(
      switchMap(({ id }) =>
        store.select(
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
            locations: ids.map((id) => ({
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
      // tap((device) => {
      //   const deviceType = device.deviceType;
      //   if (deviceType in ElementControlComponent.componentList) {
      //     // const component =
      //     this.control = ElementControlComponent.componentList[deviceType];
      //     // this.addSensor<typeof component>(component, device);
      //   }
      // })
      // map((device) => ({
      //   title: device.title,
      //   roomTitle: device.location.name,
      //   iconPath: device.iconPath,
      // }))
    );
  }

  // addSensor<T extends { context: Device & ExcludeDevice }>(
  //   component: Type<T>,
  //   device: Device & ExcludeDevice
  // ): void {
  //   const componentFactory =
  //     this.componentFactoryResolver.resolveComponentFactory(component);
  //   const viewContainerRef = this.control;
  //   viewContainerRef.clear();
  //   const createdComponent =
  //     viewContainerRef.createComponent<T>(componentFactory);
  //
  //   createdComponent.instance.context = device;
  // }
}
