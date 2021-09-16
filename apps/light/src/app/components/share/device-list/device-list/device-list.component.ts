import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { DevicesState } from '@store/devices/devices.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'z-wave-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceListComponent {
  @Select(DevicesState.showDevice) ids$!: Observable<string[]>;
}
