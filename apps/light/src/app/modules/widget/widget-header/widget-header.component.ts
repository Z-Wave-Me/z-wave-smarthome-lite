import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
interface Report {
  visibility: boolean;
  showNotification: boolean;
  intChartUrl: string;
  hasHistory: boolean;
}
@Component({
  selector: 'z-wave-widget-header[id]',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.scss'],
})
export class WidgetHeaderComponent implements OnInit {
  @Input() id!: string;
  data$: Observable<Report>;
  constructor(private readonly store: Store) {
    this.data$ = store.select(
      ({
        devices: {
          entities: { [this.id]: device },
        },
      }): Report => ({
        visibility: device.visibility,
        showNotification: device.showNotification,
        intChartUrl: device.intChartUrl,
        hasHistory: device.hasHistory,
      }),
    );
  }

  ngOnInit(): void {}
}
