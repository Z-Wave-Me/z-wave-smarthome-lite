import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'z-wave-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalWindowComponent {}
