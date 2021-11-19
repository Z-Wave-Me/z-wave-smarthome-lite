import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetOrder, UpdateFilter } from '@store/filter/filter.actions';

@Component({
  selector: 'z-wave-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss'],
})
export class ElementsComponent implements OnInit {
  constructor(private readonly store: Store) {
    store.dispatch(new UpdateFilter());
    this.store.dispatch(new SetOrder('elements'));
  }

  ngOnInit(): void {}
}
