import { Component } from '@angular/core';
import { faAccusoft as faMicrochip } from '@fortawesome/free-brands-svg-icons';

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
