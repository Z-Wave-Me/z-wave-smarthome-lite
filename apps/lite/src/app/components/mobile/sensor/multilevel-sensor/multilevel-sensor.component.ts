/* This component is used to display the value of a multilevel sensor */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'z-wave-multilevel-sensor[mode]',
  templateUrl: './multilevel-sensor.component.html',
  styleUrls: ['./multilevel-sensor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultilevelSensorComponent {
  value = 0;
  long = true;

  @Input()
  mode!: string;
  @Input()
  scale = '';

  /**
   * Set the current value of the scale
   * @param {number | string} value - The value to be displayed.
   */
  @Input()
  set currentValue(value: number | string) {
    this.value = +(+value).toFixed(3);
    this.long = this.scale?.length > 3 || this.value.toString().length > 5;
  }
  /**
   * If the value is not 0 or 99, or if the mode is not switchMultilevel, return true. Otherwise, return false
   * @returns The value of the question.
   */
  stringValue() {
    return (
      (this.value !== 0 && this.value !== 99) ||
      this.mode !== 'switchMultilevel'
    );
  }
}
