import { Component } from '@angular/core';
import {
  faHome,
  faCouch,
  faTh,
  faClipboardList,
  faCogs,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'z-wave-mobile-footer',
  templateUrl: './mobile-footer.component.html',
  styleUrls: ['./mobile-footer.component.scss'],
})
export class MobileFooterComponent {
  faHome = faHome;
  faCouch = faCouch;
  faTh = faTh;
  faClipboardList = faClipboardList;
  faCogs = faCogs;
}
