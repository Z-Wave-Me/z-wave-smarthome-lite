import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { DeviceControlService } from '@core/services/device-control/device-control.service';
import { DevicesStateModel } from '@store/devices/devices.state';

interface Report {
  level: string;
}

@Component({
  selector: 'z-wave-switch-binary-widget',
  templateUrl: './switch-binary-widget.component.html',
  styleUrls: ['./switch-binary-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchBinaryWidgetComponent {
  @Input() id!: string;
  data$: Observable<Report>;

  constructor(
    private readonly store: Store,
    private readonly dc: DeviceControlService
  ) {
    this.data$ = store.select(
      ({
        devices: {
          entities: {
            [this.id]: { metrics },
          },
        },
      }: {
        devices: DevicesStateModel;
      }): Report => ({
        level: metrics.level.toString(),
      })
    );
  }

  on(): void {
    this.dc.execute({ id: this.id, action: 'on' });
  }

  off(): void {
    this.dc.execute({ id: this.id, action: 'off' });
  }
}
