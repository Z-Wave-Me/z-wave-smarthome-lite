import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LocalsState } from '@store/locals/locals.state';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
// import { faHome, faGlobeEurope } from '@fortawesome/pro-duotone-svg-icons';
import {
  faAngry as faGlobeEurope,
  faBell as faHome,
} from '@fortawesome/free-regular-svg-icons';
import { remoteHosts } from '@components/share/server-status-widget/sever-status-widget/config';

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

  // time$: Observable<number>;
  constructor(
    private readonly store: Store,
    @Inject(DOCUMENT) private document: Document
  ) {
    // this.time$ = timer(0, 1000).pipe(map(() => Date.now()));
  }

  locationType(): 'local' | 'remote' {
    if (this.document.location.hostname in remoteHosts) {
      return 'remote';
    }
    return 'local';
  }
}
