import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilterStateModel, Order } from '@store/filter/filter.state';
import { SetOrder } from '@store/filter/filter.actions';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'z-wave-element-sub-menu-order-by',
  templateUrl: './element-sub-menu-order-by.component.html',
  styleUrls: ['./element-sub-menu-order-by.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementSubMenuOrderByComponent {
  orderList: ReadonlyMap<string, [order: Order, desc: boolean]> = new Map([
    ['updateTimeDESC', ['updateTime', true]],
    ['creationTimeDESC', ['creationTime', true]],
    ['creationTimeASC', ['creationTime', false]],
    ['titleASC', ['title', false]],
    ['titleDESC', ['title', true]],
    ['orderElements', ['elements', false]],
  ]);
  order$: Observable<string>;

  constructor(private readonly store: Store) {
    this.order$ = store.select(
      ({ filter }: FilterStateModel) => filter.orderBy.name
    );
  }

  setOrder(order: [Order, boolean], name: string): void {
    this.store.dispatch(new SetOrder('elements', ...order, name));
  }
}