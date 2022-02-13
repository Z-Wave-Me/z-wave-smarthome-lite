import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SetOrder, SetTag, UpdateFilter } from '@store/filter/filter.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'z-wave-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsComponent {
  constructor(private readonly store: Store) {
    this.store.dispatch(new UpdateFilter());
    this.store.dispatch(new SetTag());
    this.store.dispatch(new SetOrder('elements'));
  }
}
