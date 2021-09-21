import { Component } from '@angular/core';
import { faMicrochip } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'z-wave-expand-settings',
  templateUrl: './expand-settings.component.html',
  styleUrls: ['./expand-settings.component.scss'],
})
export class ExpandSettingsComponent {
  faMicrochip = faMicrochip;

  expand(element: HTMLElement) {
    element.scrollIntoView({
      behavior: 'smooth',
      inline: 'end',
    });
  }
}
