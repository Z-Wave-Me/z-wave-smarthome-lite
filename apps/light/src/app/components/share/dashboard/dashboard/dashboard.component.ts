import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetOrder, UpdateFilter } from '@store/filter/filter.actions';

@Component({
  selector: 'z-wave-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor(private readonly store: Store) {
    this.store.dispatch(new UpdateFilter({ onDashboard: true }));
    this.store.dispatch(new SetOrder('dashboard'));
  }
}
