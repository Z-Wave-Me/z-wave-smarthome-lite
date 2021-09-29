import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'z-wave-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {}
