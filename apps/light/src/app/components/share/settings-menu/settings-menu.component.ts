import { Component, ViewChild } from '@angular/core';
import { TuiHostedDropdownComponent } from '@taiga-ui/core';

@Component({
  selector: 'z-wave-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css'],
})
export class SettingsMenuComponent {
  readonly items = ['Edit', 'Download', 'Rename', 'Delete'];
  open = false;
  @ViewChild(TuiHostedDropdownComponent)
  component?: TuiHostedDropdownComponent;
  onClick() {
    this.open = false;
    if (this.component && this.component.nativeFocusableElement) {
      this.component.nativeFocusableElement.focus();
    }
  }
}
