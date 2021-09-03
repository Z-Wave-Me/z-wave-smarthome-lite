import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DropDownService } from '../drop-down.service';

@Component({
  selector: 'z-wave-drop-down-content',
  templateUrl: './drop-down-content.component.html',
  styleUrls: ['./drop-down-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownContentComponent {
  show$: Observable<boolean>;
  @Input() orientation: 'right' | 'left' = 'right';
  constructor(private readonly dropDownService: DropDownService) {
    this.show$ = this.dropDownService.isOpen;
  }
  toggle(): void {
    this.dropDownService.toggleMenu();
  }
  @HostBinding('class')
  get class(): string {
    return this.orientation + ' drop-down-content';
  }
}
