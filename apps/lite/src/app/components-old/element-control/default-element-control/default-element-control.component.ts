import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'z-wave-default-element-control',
  templateUrl: './default-element-control.component.html',
  styleUrls: ['./default-element-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultElementControlComponent {}
