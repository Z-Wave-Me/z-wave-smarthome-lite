import { Component } from '@angular/core';
import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { DevicesState } from '@store/devices/devices.state';

@Component({
  selector: 'z-wave-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent {
  @Select(DevicesState.showDevice) ids$!: Observable<string[]>;
}
