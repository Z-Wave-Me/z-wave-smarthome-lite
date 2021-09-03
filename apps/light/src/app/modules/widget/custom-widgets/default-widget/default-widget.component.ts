import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'z-wave-default-widget',
  templateUrl: './default-widget.component.html',
  styleUrls: ['./default-widget.component.scss'],
})
export class DefaultWidgetComponent implements OnInit {
  @Input() id!: string;
  level: Observable<string>;
  scaleTitle: Observable<string>;
  constructor(private store: Store) {
    this.level = store.select((state) => state.devices.entities[this.id].metrics.level);
    this.scaleTitle = store.select((state) => state.devices.entities[this.id].metrics.scaleTitle);
  }

  ngOnInit(): void {}
}
