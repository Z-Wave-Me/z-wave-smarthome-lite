import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'z-wave-autocomplete-widget[id]',
  templateUrl: './autocomplete-widget.component.html',
  styleUrls: ['./autocomplete-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteWidgetComponent {
  @Input() id!: string;
  data$: Observable<{ iconPath: string; title: string }>;

  constructor(private readonly store: Store) {
    this.data$ = store.select<{ iconPath: string; title: string }>(
      ({ devices }) => ({
        iconPath: devices.entities[this.id].iconPath,
        title: devices.entities[this.id].title,
      })
    );
  }
}