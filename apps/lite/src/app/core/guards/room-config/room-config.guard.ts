import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class RoomConfigGuard implements CanActivate {
  constructor(private readonly store: Store) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.selectSnapshot(LocalStorageState.profile).role <= 1;
  }
}
