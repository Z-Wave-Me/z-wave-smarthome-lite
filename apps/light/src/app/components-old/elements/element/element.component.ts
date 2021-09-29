import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'z-wave-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementComponent {}
