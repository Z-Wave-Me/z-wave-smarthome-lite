import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'z-wave-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {}
