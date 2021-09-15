import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DevicesState } from '@store/devices/devices.state';
import { Select, Store } from '@ngxs/store';
import { SetAutocomplete } from '@store/filter/filter.actions';

@Component({
  selector: 'z-wave-element-sub-menu-autocomplete',
  templateUrl: './element-sub-menu-autocomplete.component.html',
  styleUrls: ['./element-sub-menu-autocomplete.component.scss'],
})
export class ElementSubMenuAutocompleteComponent implements OnInit {
  @Select(DevicesState.autocomplete) autocomplete$!: Observable<string>;
  inputValue$: Observable<string>;
  constructor(private readonly store: Store) {
    this.inputValue$ = store.select(({ filter }) => filter.search ?? '');
  }

  ngOnInit(): void {}
  updateFilter(input: string, save = false): void {
    this.store.dispatch(new SetAutocomplete(input, input ? save : true));
  }
}
