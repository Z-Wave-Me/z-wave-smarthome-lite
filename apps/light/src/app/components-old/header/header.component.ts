import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { remoteHosts } from './config';
import { Select, Store } from '@ngxs/store';
import { LocalsState } from '@store/locals/locals.state';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Logout } from '@store/local-storage/local-storage.actions';

@Component({
  selector: 'z-wave-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Select(LocalsState.serverAvailable) online$!: Observable<boolean>;
  @Select(LocalsState.serverTime) serverTime$!: Observable<number>;

  constructor(private platform: Platform, @Inject(DOCUMENT) private document: Document, private store: Store) {}

  ngOnInit(): void {}

  locationType(): 'local' | 'remote' {
    if (this.document.location.hostname in remoteHosts) {
      return 'remote';
    }
    return 'local';
  }
  isAndroid(): boolean {
    return this.platform.ANDROID;
  }
  isIos(): boolean {
    return this.platform.IOS;
  }
  logout(): void {
    this.store.dispatch(new Logout());
  }
}
