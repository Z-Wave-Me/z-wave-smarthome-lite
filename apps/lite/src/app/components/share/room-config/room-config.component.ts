import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, first, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LocationsStateModel } from '@store/locations/locations.state';
import { Location } from '@store/locations/location';
import { FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { DevicesStateModel } from '@store/devices/devices.state';
import { faTrashAlt as faTrash } from '@fortawesome/free-regular-svg-icons';
import {
  faCheckCircle,
  faCircle,
  faPlusSquare as faLayerPlus,
} from '@fortawesome/free-regular-svg-icons';
import { TuiInputComponent } from '@taiga-ui/kit';
import {
  ChangeLocation,
  RemoveCustomImg,
  RemoveLocation,
  UploadCustomImg,
} from '@store/locations/locations.action';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { ChangeDevice } from '@store/devices/devices.actions';

interface MainSensorDevice {
  title: string;
  id: string;
  deviceType: string;
}

@Component({
  selector: 'z-wave-room-config',
  templateUrl: './room-config.component.html',
  styleUrls: ['./room-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class RoomConfigComponent {
  faTrash = faTrash;
  faCircle = faCircle;
  faCheckCircle = faCheckCircle;
  faLayerPlus = faLayerPlus;
  // customImage: string[] = [];
  imageList?: string[];
  removeConformation = false;
  data$: Observable<Location>;
  assignedDevices$: Observable<MainSensorDevice[]>;
  availableDevices$: Observable<Omit<MainSensorDevice, 'deviceType'>[]>;
  form?: FormGroup;
  config = {
    maxSize: '500.0 kB',
    extension: 'png,jpg,jpeg,gif',
    dimension: '512 x 512',
  };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly destroy$: DestroyService,
    private readonly store: Store,
    private readonly translocoService: TranslocoService,
    private readonly router: Router,
    private readonly notifications: TuiNotificationsService
  ) {
    this.data$ = activatedRoute.url.pipe(
      takeUntil(destroy$),
      filter(([{ path }]) => +path !== 0),
      switchMap(([{ path }]) =>
        store.select(
          ({ locations: { entities } }: { locations: LocationsStateModel }) =>
            entities?.[+path]
        )
      ),
      filter((location) => !!location)
    );
    this.assignedDevices$ = activatedRoute.url.pipe(
      takeUntil(destroy$),
      switchMap(([{ path }]) =>
        store.select(
          ({ devices: { entities } }: { devices: DevicesStateModel }) =>
            Object.values(entities)
              .filter((device) => device.location === +path)
              .map((item) => ({
                title: item.title,
                id: item.id,
                deviceType: item.deviceType,
              }))
        )
      )
    );
    this.availableDevices$ = store.select(
      ({ devices: { entities } }: { devices: DevicesStateModel }) =>
        Object.values(entities)
          .filter((device) => device.location === 0)
          .map((item) => ({ title: item.title, id: item.id }))
    );
    this.data$.pipe(first()).subscribe((location) => {
      // this.form = formBuilder.group({
      //   title: [location.title, [Validators.required]],
      //   img: [location.imgSrc],
      //   customImage: [location.user_img],
      //   setAsBackground: [location.show_background],
      // });
      // this.customImage = [location.user_img];
    });
  }

  setImage(image: string): void {
    if (this.form?.get('img')?.value === image) {
      this.form.patchValue({ img: '', setAsBackground: false });
    } else {
      this.form?.patchValue({ img: image });
    }
  }

  clearSensors(): void {
    throw new Error('clearSensors not implemented');
  }

  removeDevice(
    event: Event,
    device: Omit<MainSensorDevice, 'deviceType'>,
    loc: Location
  ): void {
    event.stopPropagation();
    if (loc.main_sensors.includes(device.id))
      this.store.dispatch(
        new ChangeLocation({
          ...loc,
          main_sensors: loc.main_sensors.filter((el) => el !== device.id),
        })
      );
    this.store.dispatch(new ChangeDevice({ ...device, location: 0 }, true));
  }

  toggleMainSensor(loc: Location, id: string, available: boolean) {
    if (available) {
      let mainSensors = [...loc.main_sensors];
      if (mainSensors.includes(id)) {
        mainSensors = mainSensors.filter((el) => el !== id);
      } else {
        if (mainSensors.length < 4) mainSensors.push(id);
      }
      this.store.dispatch(
        new ChangeLocation({ ...loc, main_sensors: mainSensors })
      );
    }
  }

  addDevice(
    device: Omit<MainSensorDevice, 'deviceType'>,
    location: number
  ): void {
    this.store.dispatch(new ChangeDevice({ ...device, location }, true));
  }

  tracker(i: number) {
    return i;
  }

  changeName(input: TuiInputComponent, loc: Location, focused: boolean) {
    if (!focused) {
      if (input.value === '') {
        input.writeValue(loc.title);
      }
      if (input.value !== loc.title) {
        this.store.dispatch(new ChangeLocation({ ...loc, title: input.value }));
      }
    }
  }

  removeRoom(loc: Location) {
    this.router.navigate(['rooms']).then(() => {
      this.store.dispatch(new RemoveLocation(loc.id));
      this.notifications
        .show(this.translocoService.translate<string>('delete_successful'), {
          status: TuiNotification.Success,
        })
        .subscribe();
    });
  }

  uploadImg(id: number, file?: File) {
    if (file) this.store.dispatch(new UploadCustomImg(id, file));
  }

  changeImg(loc: Location, data?: { url?: string; default: boolean }) {
    const update: Partial<Location> = {};
    if (data?.default) {
      update.img_type = 'default';
      update.default_img = data.url ?? '';
    } else {
      update.img_type = 'user';
      update.user_img = data?.url ?? '';
    }
    this.store.dispatch(new ChangeLocation({ ...loc, ...update }));
  }

  removeCustomImg(id: number) {
    this.store.dispatch(new RemoveCustomImg(id));
  }
}
