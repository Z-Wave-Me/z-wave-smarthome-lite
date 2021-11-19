import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'z-wave-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicesComponent {}
