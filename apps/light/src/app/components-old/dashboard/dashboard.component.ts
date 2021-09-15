import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetOrder, UpdateFilter } from '@store/filter/filter.actions';

@Component({
  selector: 'z-wave-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private readonly store: Store) {
    // this.ids$ = store.select(DevicesState.withFilter({ onDashboard: true }));
    this.store.dispatch(new UpdateFilter({ onDashboard: true }));
    this.store.dispatch(new SetOrder('dashboard'));
  }
  ngOnInit(): void {}
}
