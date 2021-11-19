import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LocalsState } from '@store/locals/locals.state';
import { Observable } from 'rxjs';
import { remoteHosts } from '../../../../components-old/header/config';
import { DOCUMENT } from '@angular/common';
import { faHome, faGlobeEurope } from '@fortawesome/pro-duotone-svg-icons';

@Component({
  selector: 'z-wave-sever-status-widget',
  templateUrl: './sever-status-widget.component.html',
  styleUrls: ['./sever-status-widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeverStatusWidgetComponent {
  @Select(LocalsState.serverAvailable) online$!: Observable<boolean>;
  @Select(LocalsState.serverTime) serverTime$!: Observable<number>;

  faHome = faHome;
  faGlobeEurope = faGlobeEurope;
  constructor(
    private readonly store: Store,
    @Inject(DOCUMENT) private document: Document
  ) {}

  locationType(): 'local' | 'remote' {
    if (this.document.location.hostname in remoteHosts) {
      return 'remote';
    }
    return 'local';
  }
}
