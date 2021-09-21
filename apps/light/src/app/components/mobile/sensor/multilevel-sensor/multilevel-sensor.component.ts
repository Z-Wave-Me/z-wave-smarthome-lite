import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'z-wave-multilevel-sensor',
  templateUrl: './multilevel-sensor.component.html',
  styleUrls: ['./multilevel-sensor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultilevelSensorComponent {
  value = 0;
  long = true;

  @Input()
  scale = '';

  @Input()
  set currentValue(value: number | string) {
    this.value = +(+value).toFixed(3);
    this.long = this.scale.length > 3 || this.value.toString().length > 5;
  }
}
