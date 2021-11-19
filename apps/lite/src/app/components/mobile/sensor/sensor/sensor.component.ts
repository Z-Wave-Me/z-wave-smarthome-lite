import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChangeLevel } from '@store/devices/devices.actions';

@Component({
  selector: 'z-wave-sensor[id][metrics][type]',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorComponent {
  @Input()
  id!: string;
  @Input()
  metrics!: Record<string, any>;
  @Input()
  type!: string;
  constructor(private readonly store: Store) {}
  multilevelUpdate(level: number) {
    this.store.dispatch(
      new ChangeLevel({ id: this.id, level: Math.trunc(level * 0.99) })
    );
  }

  binaryUpdate(value: number) {
    this.store.dispatch(
      new ChangeLevel({ id: this.id, level: value ? 'on' : 'off' })
    );
  }
}
