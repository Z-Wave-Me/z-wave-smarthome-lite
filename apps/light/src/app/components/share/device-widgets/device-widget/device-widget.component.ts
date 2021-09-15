import { Component, Input } from '@angular/core';

@Component({
  selector: 'z-wave-device-widget[id]',
  templateUrl: './device-widget.component.html',
  styleUrls: ['./device-widget.component.css'],
})
export class DeviceWidgetComponent {
  @Input() id!: string;
}
