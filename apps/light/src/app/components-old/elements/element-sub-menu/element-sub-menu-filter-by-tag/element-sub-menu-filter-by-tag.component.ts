import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FilterStateModel } from '@store/filter/filter.state';
import { DevicesState } from '@store/devices/devices.state';
import { SetTag } from '@store/filter/filter.actions';

@Component({
  selector: 'z-wave-element-sub-menu-filter-by-tag',
  templateUrl: './element-sub-menu-filter-by-tag.component.html',
  styleUrls: ['./element-sub-menu-filter-by-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementSubMenuFilterByTagComponent {
  tag$: Observable<string | undefined>;
  @Select(DevicesState.tagsList) tagsList$!: Observable<string[]>;

  constructor(private readonly store: Store) {
    this.tag$ = store.select(({ filter }: FilterStateModel) => filter.tag);
  }

  addTagFilter(tag?: string): void {
    this.store.dispatch(new SetTag(tag));
  }
}
