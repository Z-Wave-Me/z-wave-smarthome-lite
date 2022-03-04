import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faRadar } from '@fortawesome/pro-thin-svg-icons';
@Component({
  selector: 'z-wave-nothing-found',
  templateUrl: './nothing-found.component.html',
  styleUrls: ['./nothing-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NothingFoundComponent {
  faRadar = faRadar;
}
