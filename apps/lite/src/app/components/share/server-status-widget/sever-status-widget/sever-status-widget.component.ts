import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LocalsState } from '@store/locals/locals.state';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { faHome, faGlobeEurope } from '@fortawesome/pro-duotone-svg-icons';
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
  @Select(LocalsState.localGMT) localGMT$!: Observable<string>;

  faHome = faHome;
  faGlobeEurope = faGlobeEurope;

  // time$: Observable<number>;
  constructor(
    private readonly store: Store,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    // this.time$ = timer(0, 1000).pipe(map(() => Date.now()));
  }
  @HostListener('doubletap')
  refresh() {
    this.document.location.reload();
  }
  locationType(): 'local' | 'remote' {
    if (remoteHosts.includes(this.document.location.hostname)) {
      return 'remote';
    }
    return 'local';
  }
}
