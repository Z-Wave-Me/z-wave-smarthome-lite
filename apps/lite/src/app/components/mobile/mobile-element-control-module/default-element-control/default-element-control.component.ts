import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcludeDevice } from '@components/mobile/mobile-element-control-module/interfaces';
import { Device } from '@store/devices/deviceInterface';
import { pairwise, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import {
  ChangeDevice,
  UpdateDevices,
  UpdateMetrics,
} from '@store/devices/devices.actions';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { startWith } from 'rxjs';

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
  form!: FormGroup;
  mode: 'binary' | 'multi' = 'binary';
  disabled = false;
  constructor(
    private readonly formBuilder: FormBuilder,
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
      onDashboard: [this.context.onDashboard],
      hideEvents: [this.context.hideEvents],
      location: [this.context.location],
      tags: [this.context.tags],
    });
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((data) => {
          console.log('form data', data);
          data.location = data.location.id;
          data.visibility = !data.hidden;
          this.store.dispatch(
            new ChangeDevice({ ...data, id: this.context.id })
          );
          // if (cur.title !== prev.title)
        })
      )
      .subscribe();
  }
  update(field: keyof Device, value: string | number) {
    console.log(field, value);
  }
}
