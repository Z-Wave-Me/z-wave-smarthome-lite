import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { filter, map } from 'rxjs/operators';

interface Report {
  iconPath: string;
  level: string | number;
  title: string;
  scaleTitle: string;
}
@Component({
  selector: 'z-wave-main-sensor-widget[id]',
  templateUrl: './main-sensor-widget.component.html',
  styleUrls: ['./main-sensor-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSensorWidgetComponent {
  @Input() id!: string;
  readonly device$: Observable<Report>;

  constructor(private readonly store: Store) {
    this.device$ = store
      .select((state) => state.devices.entities[this.id])
      .pipe(
        filter((device) => !!device),
        map(({ metrics, iconPath }) => ({ ...metrics, iconPath }))
      );
  }
}
