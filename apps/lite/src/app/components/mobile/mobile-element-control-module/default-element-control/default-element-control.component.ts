import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcludeDevice } from '@components/mobile/mobile-element-control-module/interfaces';
import { Device } from '@store/devices/deviceInterface';

@Component({
  selector: 'z-wave-default-element-control',
  templateUrl: './default-element-control.component.html',
  styleUrls: ['./default-element-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultElementControlComponent implements OnInit {
  @Input()
  context!: Device & ExcludeDevice;
  form!: FormGroup;
  mode: 'binary' | 'multi' = 'binary';
  disabled = false;
  constructor(private readonly formBuilder: FormBuilder) {}

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
      dashboard: [this.context.onDashboard],
      hideEvents: [this.context.hideEvents],
      location: [this.context.location],
      tags: [this.context.tags],
    });
  }
  update(field: keyof Device, value: string | number) {
    console.log(field, value);
  }
}
