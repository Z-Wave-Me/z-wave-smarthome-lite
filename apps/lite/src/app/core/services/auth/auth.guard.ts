import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { map, mapTo } from 'rxjs/operators';
import { LocalStorageState } from '@store/local-storage/local-storage.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(LocalStorageState.token).pipe(
      mapTo(true)
      // map((auth) => {
      //   if (auth) {
      //     return true;
      //   }
      //   return this.router.createUrlTree(['/login']);
      // })
    );
  }
}