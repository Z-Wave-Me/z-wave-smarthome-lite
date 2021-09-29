import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'z-wave-widget[id]',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent {
  @Input() id!: string;
  deviceType$: Observable<string>;
  isMobile: boolean;

  constructor(
    private readonly deviceDetectorService: DeviceDetectorService,
    private readonly store: Store
  ) {
    this.isMobile = deviceDetectorService.isMobile();
    this.deviceType$ = store.select<string>(
      (state) => state.devices.entities[this.id].deviceType
    );
  }
}
