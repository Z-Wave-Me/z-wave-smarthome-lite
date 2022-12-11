import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'z-wave-elements-sub-menu',
  templateUrl: './elements-sub-menu.component.html',
  styleUrls: ['./elements-sub-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsSubMenuComponent {
  autocompleteForm: UntypedFormGroup;

  constructor(private readonly formBuilder: UntypedFormBuilder) {
    this.autocompleteForm = this.formBuilder.group({
      deviceName: [],
    });
  }
}
