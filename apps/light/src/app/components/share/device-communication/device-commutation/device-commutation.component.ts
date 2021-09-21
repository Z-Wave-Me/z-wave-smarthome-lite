import { Component, Input } from '@angular/core';

@Component({
  selector: 'z-wave-device-commutation[mode]',
  templateUrl: './device-commutation.component.html',
  styleUrls: ['./device-commutation.component.scss'],
})
export class DeviceCommutationComponent {
  @Input() mode!: 'generated' | 'referenced';
}
