import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { finalize, Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';

import { map, mapTo } from 'rxjs/operators';
import {
  IProfile,
  LocalStorageState,
  ZWayResponse,
} from '@store/local-storage/local-storage.state';
import { ApiService } from '@core/services/api/api.service';
import { SetUser } from '@store/local-storage/local-storage.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private readonly apiService: ApiService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.apiService.send<ZWayResponse<IProfile> | null>('session').pipe(
      map((response) => {
        if (response?.data.id) {
          this.store.dispatch(new SetUser(response.data));
          return true;
        }
        return this.router.createUrlTree(['/firstAccess']);
      })
    );
    // return this.store.select(LocalStorageState.token).pipe(
    //   mapTo(true)
    //   // map((auth) => {
    //   //   if (auth) {
    //   //     return true;
    //   //   }
    //   //   return this.router.createUrlTree(['/login']);
    //   // })
    // );
  }
}
