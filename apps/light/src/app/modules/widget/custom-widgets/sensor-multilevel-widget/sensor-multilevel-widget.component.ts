import { Component, Input, OnInit } from '@angular/core';
import { DeviceControlService } from '@core/services/device-control/device-control.service';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DevicesStateModel } from '@store/devices/devices.state';

interface Report {
  updateTime: number;
  level: number;
  scaleTitle: string;
}
@Component({
  selector: 'z-wave-sensor-multilevel-widget[id]',
  templateUrl: './sensor-multilevel-widget.component.html',
  styleUrls: ['./sensor-multilevel-widget.component.scss'],
})
export class SensorMultilevelWidgetComponent implements OnInit {
  @Input() id!: string;
  data$: Observable<Report>;
  constructor(private readonly store: Store, private readonly deviceControlService: DeviceControlService) {
    this.data$ = store.select(
      ({
        devices: {
          entities: { [this.id]: device },
        },
      }: {
        devices: DevicesStateModel;
      }): Report => ({
        updateTime: device.updateTime,
        level: +device.metrics.level,
        scaleTitle: device.metrics.scaleTitle.toString(),
      }),
    );
  }

  command(action: string): void {
    this.deviceControlService.execute({ id: this.id, action });
  }
  ngOnInit(): void {}
}
