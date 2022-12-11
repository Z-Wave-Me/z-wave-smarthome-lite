import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ExcludeDevice } from '@components/mobile/mobile-element-control-module/interfaces';
import { Device } from '@store/devices/deviceInterface';
import { pairwise, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ChangeDevice } from '@store/devices/devices.actions';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { SetProfile } from '@store/local-storage/local-storage.actions';
import { startWith } from 'rxjs';
import { LocalStorageState } from '@store/local-storage/local-storage.state';

@Component({
  selector: 'z-wave-default-element-control',
  templateUrl: './default-element-control.component.html',
  styleUrls: ['./default-element-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class DefaultElementControlComponent implements OnInit {
  @Input()
  context!: Device & ExcludeDevice;
  form!: UntypedFormGroup;
  mode: 'binary' | 'multi' = 'binary';
  disabled = false;

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly store: Store,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    if (this.context.deviceType.endsWith('Binary')) {
      this.mode = 'binary';
    }
    if (this.context.deviceType.endsWith('Multilevel')) {
      this.mode = 'multi';
    }
    if (this.context.deviceType.startsWith('sensorBinary')) {
      this.disabled = true;
    }
    this.form = this.formBuilder.group({
      title: [this.context.title, Validators.required],
      hidden: [!this.context.visibility],
      hideEvents: [this.context.hideEvents],
      onDashboard: [this.context.onDashboard],
      location: [this.context.location],
      tags: [this.context.tags],
    });
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        startWith({
          title: this.context.title,
          hidden: !this.context.visibility,
          hideEvents: this.context.hideEvents,
          onDashboard: this.context.onDashboard,
          location: this.context.location,
          tags: this.context.tags,
        }),
        pairwise(),
        tap(([oldValue, newValue]) => {
          if (oldValue.onDashboard !== newValue.onDashboard) {
            const dashboard = this.store.selectSnapshot(
              LocalStorageState.dashboard
            );
            if (newValue.onDashboard)
              this.store.dispatch(
                new SetProfile({
                  dashboard: [...dashboard, this.context.id],
                  synchronized: false,
                })
              );
            else
              this.store.dispatch(
                new SetProfile({
                  dashboard: dashboard.filter((el) => el !== this.context.id),
                  synchronized: false,
                })
              );
          } else {
            // console.log('form data', newValue);
            this.store.dispatch(
              new ChangeDevice(
                {
                  ...newValue,
                  location: newValue.location.id,
                  visibility: !newValue.hidden,
                  id: this.context.id,
                },
                true
              )
            );
          }
        })
      )
      .subscribe();
    // this.form
    //   .get('onDashboard')
    //   ?.valueChanges.pipe(
    //     takeUntil(this.destroy$),
    //     tap((data) => {
    //       console.warn(data, this.context.id);
    //
    //     })
    //   )
    //   .subscribe();
  }

  update(field: keyof Device, value: string | number) {
    console.log(field, value);
  }
}
