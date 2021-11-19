import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { DefaultElementControlComponent } from './default-element-control/default-element-control.component';
import { Store } from '@ngxs/store';
import { DevicesStateModel } from '@store/devices/devices.state';
import { SwitchMultilevelControlComponent } from './switch-multilevel-control/switch-multilevel-control.component';

@Component({
  selector: 'z-wave-element-control',
  templateUrl: './element-control.component.html',
  styleUrls: ['./element-control.component.scss'],
})
export class ElementControlComponent {
  private static readonly componentList: { [index: string]: any } = {
    switchMultilevel: SwitchMultilevelControlComponent,
  };
  data$: Observable<string>;
  @ViewChild('control', { static: true, read: ViewContainerRef })
  control!: ViewContainerRef;
  private component = DefaultElementControlComponent;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly store: Store
  ) {
    this.data$ = activatedRoute.params.pipe(
      switchMap(({ id }) =>
        store.select(
          ({ devices: { entities } }: { devices: DevicesStateModel }) =>
            entities[id]
        )
      ),
      filter((entry) => !!entry),
      first(),
      map((device) => device.deviceType),
      tap((deviceType) => {
        this.component = ElementControlComponent.componentList[deviceType];
        this.loadComponent();
        console.log('hey');
      })
    );
  }

  loadComponent(): void {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(this.component);
    const viewContainerRef = this.control;
    viewContainerRef.clear();
    viewContainerRef.createComponent<DefaultElementControlComponent>(
      componentFactory
    );
  }
}
