import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { DevicesStateModel } from '@store/devices/devices.state';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/services/api/api.service';
import { Location } from '@store/locations/location';
import { LocationsStateModel } from '@store/locations/locations.state';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

interface Report {
  title: string;
  id: number;
  visibility: boolean;
  onDashboard: boolean;
}

interface Info {
  category: string;
  moduleId: string;
}

interface Referenced {}

@Component({
  selector: 'z-wave-element-config',
  templateUrl: './element-config.component.html',
  styleUrls: ['./element-config.component.scss'],
})
export class ElementConfigComponent implements OnInit {
  @ViewChild('addTagField') addTagField!: ElementRef<HTMLInputElement>;
  data$: Observable<Report>;
  instance$: Observable<Info>;
  referenced$: Observable<Referenced>;
  form: FormGroup;
  locations$: Observable<Pick<Location, 'title' | 'id'>[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  // hidden$: Observable<boolean>;
  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      title: [''],
      hideElement: [false],
      onDashboard: [false],
      hideEvents: [false],
      location: [2],
      tags: formBuilder.array(['lol', 'wow']),
      notification: formBuilder.array([]),
    });
    this.data$ = route.params.pipe(
      switchMap(({ id }) => store.select(({ devices: { entities } }: { devices: DevicesStateModel }) => entities[id])),
      tap((device) => {
        console.log(device);
      }),
      filter((device) => {
        return !!device;
      }),
      map(
        (device): Report => ({
          title: device.title,
          id: device.creatorId,
          visibility: device.visibility,
          onDashboard: device.onDashboard,
        }),
      ),
    );
    this.instance$ = this.data$.pipe(
      switchMap(({ id }) => apiService.send('instances', { command: id })),
      tap((istance) => console.log(istance)),
      map(({ data }) => ({
        moduleId: data.moduleId,
        category: data.category,
      })),
    );
    this.referenced$ = route.params.pipe(
      switchMap(({ id }) => apiService.send('devices', { command: id + '/referenced' })),
    );
    // this.data$ = store.select(
    //   ({
    //      devices: {
    //        entities: { [this.id]: device },
    //      },
    //    }): Report => ({
    //     iconPath: device.iconPath,
    //     title: device.title,
    //     inProgress: device.inProgress,
    //     location: device.location,
    //     updateTime: device.updateTime * 1e3,
    //   }),
    this.locations$ = store.select(({ locations: { entities } }: { locations: LocationsStateModel }) =>
      Object.values(entities).map((entity) => ({
        title: entity.title,
        id: entity.id,
      })),
    );
  }

  ngOnInit(): void {
    // this.data$ = this.route.paramMap.pipe(
    //   switchMap((params) => {
    //     const id = params.getAll('id')[0];
    //       return this.store.select(
    //         ({
    //            devices: {
    //              entities: {[id]: device},
    //            },
    //          }: {
    //           devices: DevicesStateModel;
    //         }): Report => ({
    //           title: device.title,
    //         }),
    //       ),
    //     }
    //   ),
    // );
  }

  submit(): void {}

  linkSupplier(type: string): string {
    return '';
  }

  deleteElement(): void {
    // TODO Delete element
    // _t('element_delete_confirm')
  }

  addTag(event: MatChipInputEvent): void {
    this.tags().push(this.newTag(event.value));
    this.addTagField.nativeElement.value = '';
  }

  removeTag(i: number): void {
    this.tags().removeAt(i);
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.tags().push(this.newTag(event.option.viewValue));
    this.addTagField.nativeElement.value = '';
  }

  tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  notification(): FormArray {
    return this.form.get('notification') as FormArray;
  }

  addNotification(): void {
    this.notification().push(this.newNotification());
  }

  removeNotification(index: number): void {
    this.notification().removeAt(index);
  }

  private newTag(tag: string): FormControl {
    return this.formBuilder.control(tag);
  }

  private newNotification(): FormGroup {
    return this.formBuilder.group({
      operator: ['dawdaw'],
      trigger: ['12'],
      channel: ['all'],
      message: ['what', Validators.required],
    });
  }
}
