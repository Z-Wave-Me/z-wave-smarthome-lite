import { Component } from '@angular/core';
import { faGear } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'z-wave-expand-settings',
  templateUrl: './expand-settings.component.html',
  styleUrls: ['./expand-settings.component.scss'],
})
export class ExpandSettingsComponent {
  faMicrochip = faGear;

  /**
   * Expand the element to the end of the page
   * @param {HTMLElement} element - The element to scroll into view.
   */
  expand(element: HTMLElement) {
    element.scrollIntoView({
      behavior: 'smooth',
      inline: 'end',
    });
  }
}
