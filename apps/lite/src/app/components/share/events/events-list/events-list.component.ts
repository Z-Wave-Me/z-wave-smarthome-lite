import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'z-wave-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListComponent {}
