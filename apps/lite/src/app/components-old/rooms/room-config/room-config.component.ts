import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, first, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LocationsStateModel } from '@store/locations/locations.state';
import { Location } from '@store/locations/location';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@modules/dialog/dialog.component';
import { TranslocoService } from '@ngneat/transloco';
import { DevicesStateModel } from '@store/devices/devices.state';

@Component({
  selector: 'z-wave-room-config',
  templateUrl: './room-config.component.html',
  styleUrls: ['./room-config.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomConfigComponent {
  customImage: string[] = [];
  imageList?: string[];
  data$: Observable<Location>;
  assignedDevices$: Observable<string[]>;
  availedDevices$: Observable<string[]>;
  form?: FormGroup;
  config = {
    maxSize: '500.0 kB',
    extension: 'png,jpg,jpeg,gif',
    dimension: '512 x 512',
  };
  private defaultImages = [
    'kitchen.jpg',
    'bathroom.jpg',
    'sleeping_room.jpg',
    'living_room.jpg',
  ].map((img) => 'assets/img/rooms/' + img);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly destroy$: DestroyService,
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    private readonly matDialog: MatDialog,
    private readonly translocoService: TranslocoService
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
              .map((item) => item.title)
        )
      )
    );
    this.availedDevices$ = store.select(
      ({ devices: { entities } }: { devices: DevicesStateModel }) =>
        Object.values(entities)
          .filter((device) => device.location === 0)
          .map((item) => item.title)
    );
    this.data$.pipe(first()).subscribe((location) => {
      this.form = formBuilder.group({
        title: [location.title, [Validators.required]],
        img: [location.imgSrc],
        customImage: [''],
        setAsBackground: [location.show_background],
      });
      this.imageList = [...this.defaultImages, ...this.customImage];
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

  updateImageList(target: EventTarget | null = null): void {
    const image = this.form?.get('customImage')?.value;
    const rowData = (target as HTMLInputElement)?.files?.[0];
    if (image && rowData) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form?.get('img')?.setValue(reader.result as string);
        this.customImage = [reader.result as string];
        this.imageList = [...this.defaultImages, ...this.customImage];
      };
      reader.readAsDataURL(rowData);
    } else {
      this.form?.get('customImage')?.setValue('');
      this.customImage = [];
      this.imageList = [...this.defaultImages, ...this.customImage];
    }
  }

  deleteRoom(): void {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        title: this.translocoService.translate('delete_confirm_label'),
        text: this.translocoService.translate('delete_confirm_label', {
          __label__: this.form?.get('title')?.value,
        }),
        confirm: this.translocoService.translate('ok'),
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          // TODO need add delete room
        }
      });
  }

  clearSensors(): void {
    throw new Error('clearSensors not implemented');
  }
  removeDevice(): void {
    throw new Error('removeDevice not implemented');
  }
  addDevice(): void {
    throw new Error('addDevice not implemented');
  }
}
