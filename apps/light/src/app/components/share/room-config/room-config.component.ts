import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, first, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LocationsStateModel } from '@store/locations/locations.state';
import { Location } from '@store/locations/location';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { DevicesStateModel } from '@store/devices/devices.state';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import {
  faCheckCircle,
  faCircle,
  faLayerPlus,
} from '@fortawesome/pro-regular-svg-icons';
import { TuiInputComponent } from '@taiga-ui/kit';
import {
  ChangeLocation,
  RemoveCustomImg,
  RemoveLocation,
  UploadCustomImg,
} from '@store/locations/locations.action';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';

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
  customImage: string[] = [];
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
    private readonly formBuilder: FormBuilder,
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
      this.form = formBuilder.group({
        title: [location.title, [Validators.required]],
        img: [location.imgSrc],
        customImage: [location.user_img],
        setAsBackground: [location.show_background],
      });
      this.customImage = [location.user_img];
      console.log(location.user_img);
    });
    // this.form = formBuilder.group({
    //   test: ['wow'],
    //   title: ['test', [Validators.required]],
    //   img: [''],
    //   customImage: [''],
    //   setAsBackground: [false],
    // });
  }

  // $scope.store = function(form, input) {
  //   if (form.$invalid) {
  //     return;
  //   }
  //   $scope.loading = {
  //     status: 'loading-spin',
  //     icon: 'fa-spinner fa-spin',
  //     message: $scope._t('updating')
  //   };
  //   dataFactory.storeApi('locations', input.id, input).then(function(response) {
  //     $scope.loading = false;
  //     var id = $filter('hasNode')(response, 'data.data.id');
  //     if (id) {
  //       saveRoomIdIntoDevice(response.data, $scope.devicesAssigned);
  //       removeRoomIdFromDevice($scope.devicesToRemove);
  //       myCache.removeAll();
  //       /*myCache.remove('locations');
  //        myCache.remove('devices');*/
  //       dataService.showNotifier({
  //         message: $scope._t('success_updated')
  //       });
  //       $location.path('/rooms');
  //     }
  //
  //
  //   }, function(error) {
  //     alertify.alertError($scope._t('error_update_data'));
  //     $scope.loading = false;
  //
  //   });
  //
  // };

  submit(): void {
    console.log(this.form);
  }

  setImage(image: string): void {
    if (this.form?.get('img')?.value === image) {
      this.form.patchValue({ img: '', setAsBackground: false });
    } else {
      this.form?.patchValue({ img: image });
    }
  }

  deleteRoom(): void {
    // const dialogRef = this.matDialog.open(DialogComponent, {
    //   data: {
    //     title: this.translocoService.translate('delete_confirm_label'),
    //     text: this.translocoService.translate('delete_confirm_label', {
    //       __label__: this.form?.get('title')?.value,
    //     }),
    //     confirm: this.translocoService.translate('ok'),
    //   },
    // });
    // dialogRef
    //   .afterClosed()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((result) => {
    //     if (result) {
    //       // TODO need add delete room
    //     }
    //   });
  }

  clearSensors(): void {
    throw new Error('clearSensors not implemented');
  }
  removeDevice(event: Event): void {
    event.stopPropagation();
    console.log('removeDevice');
    // throw new Error('removeDevice not implemented');
  }
  toggleMainSensor(id: string, available: boolean) {
    console.log('toggleMainSensor ', id, available);
  }
  addDevice(id: string): void {
    console.log('add Device', id);
    // throw new Error('addDevice not implemented');
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
    this.store
      .dispatch(new RemoveLocation(loc.id))
      .pipe(
        switchMap(() => this.router.navigate(['rooms'])),
        switchMap(() =>
          this.notifications.show(
            this.translocoService.translate<string>('delete_successful'),
            {
              status: TuiNotification.Success,
            }
          )
        )
      )
      .subscribe();
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
