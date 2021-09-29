import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { DevicesStateModel } from '@store/devices/devices.state';
import { DeviceControlService } from '@core/services/device-control/device-control.service';

interface Report {
  level: number;
  scaleTitle: string;
  probeType: string;
}

@Component({
  selector: 'z-wave-switch-multilevel-widget',
  templateUrl: './switch-multilevel-widget.component.html',
  styleUrls: ['./switch-multilevel-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchMultilevelWidgetComponent {
  @Input() id!: string;
  data$: Observable<Report>;

  constructor(
    private readonly store: Store,
    private readonly deviceControlService: DeviceControlService
  ) {
    this.data$ = store.select(
      ({
        devices: {
          entities: { [this.id]: device },
        },
      }: {
        devices: DevicesStateModel;
      }): Report => ({
        level: +device.metrics.level,
        scaleTitle: device.metrics?.scaleTitle?.toString(),
        probeType: device.probeType,
      })
    );
  }

  command(action: string): void {
    this.deviceControlService.execute({ id: this.id, action });
  }

  setLevel(level: string | number): void {
    this.deviceControlService.execute({
      id: this.id,
      action: 'exact?level=' + level,
    });
  }

  test(): void {
    console.log('WOW');
  }
}
