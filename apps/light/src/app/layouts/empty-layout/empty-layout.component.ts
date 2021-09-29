import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'z-wave-empty-layout',
  templateUrl: './empty-layout.component.html',
  styleUrls: ['./empty-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyLayoutComponent {}
