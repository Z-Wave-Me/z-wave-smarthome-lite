import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'z-wave-elements-sub-menu',
  templateUrl: './elements-sub-menu.component.html',
  styleUrls: ['./elements-sub-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsSubMenuComponent {
  autocompleteForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.autocompleteForm = this.formBuilder.group({
      deviceName: [],
    });
  }
}
