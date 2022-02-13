import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetOrder, SetTag, UpdateFilter } from '@store/filter/filter.actions';

@Component({
  selector: 'z-wave-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {
  constructor(private readonly store: Store) {
    this.store.dispatch(new UpdateFilter());
    this.store.dispatch(new SetTag());
    this.store.dispatch(new SetOrder('rooms'));
  }
}
