import { Component } from '@angular/core';
import {
  faHome,
  faCouch,
  faGrid,
  faClipboardList,
  faCogs,
} from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'z-wave-mobile-footer',
  templateUrl: './mobile-footer.component.html',
  styleUrls: ['./mobile-footer.component.scss'],
})
export class MobileFooterComponent {
  faHome = faHome;
  faCouch = faCouch;
  faTh = faGrid;
  faClipboardList = faClipboardList;
  faCogs = faCogs;
}
