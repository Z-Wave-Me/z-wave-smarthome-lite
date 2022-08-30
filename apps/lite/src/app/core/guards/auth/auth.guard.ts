import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';

import { catchError, map } from 'rxjs/operators';
import { IProfile } from '@store/local-storage/local-storage.state';
import { ApiService } from '@core/services/api/api.service';
import { SetUser } from '@store/local-storage/local-storage.actions';
import { WebsocketService } from '@core/services/websocket/websocket.service';
import { CookieService } from 'ngx-cookie-service';

/**
 *  It sends a request to the API to check if the user is logged in. If the user is logged in,
 *  it sets the user in the store and returns true. If the user is not logged in, it redirects to the login page
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private store: Store,
    private router: Router,
    private readonly apiService: ApiService,
    private readonly websocketService: WebsocketService,
    private readonly cookieService: CookieService
  ) {}

  /**
   * It sends a request to the API to check if the user is logged in. If the user is logged in, it sets the user in the
   * store and returns true. If the user is not logged in, it redirects to the login page.
   * @returns An Observable<boolean | UrlTree>
   */
  canLoad(): Observable<boolean | UrlTree> {
    return this.apiService
      .send<IProfile>('session', undefined, { withResponse: true })
      .pipe(
        map((profile) => {
          if (
            profile.sid &&
            profile.sid === this.cookieService.get('ZWAYSession')
          ) {
            this.websocketService.connect();
            this.store.dispatch(new SetUser(profile));
            return true;
          }
          return this.router.createUrlTree(['/firstAccess']);
        }),
        catchError(() => of(this.router.createUrlTree(['/firstAccess'])))
      );
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   console.log(route, state);
  //   return this.apiService.send<IProfile>('session', undefined, true).pipe(
  //     map((profile) => {
  //       if (
  //         profile.sid &&
  //         profile.sid === this.cookieService.get('ZWAYSession')
  //       ) {
  //         this.websocketService.connect();
  //         this.store.dispatch(new SetUser(profile));
  //         return true;
  //       }
  //       return this.router.createUrlTree(['/firstAccess']);
  //     }),
  //     catchError(() => of(this.router.createUrlTree(['/firstAccess'])))
  //   );
  // }
}
