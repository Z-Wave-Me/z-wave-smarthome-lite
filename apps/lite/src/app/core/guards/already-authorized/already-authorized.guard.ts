import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {
  IProfile,
  ZWayResponse,
} from '@store/local-storage/local-storage.state';
import { catchError, map, tap } from 'rxjs/operators';
import {
  SetServerInfo,
  SetUser,
} from '@store/local-storage/local-storage.actions';
import { ApiService } from '@core/services/api/api.service';
import { Store } from '@ngxs/store';
import { CookieService } from '@core/services/cookie/cookie.service';
import { HttpClient } from '@angular/common/http';
interface IFirstAccess {
  firstaccess: boolean;
  ip_address: string;
  remote_id: number;
}
/**
 * It checks if the user is already authorized. If so, it redirects the user to the dashboard
 */

@Injectable({
  providedIn: 'root',
})
export class AlreadyAuthorizedGuard implements CanActivate {
  constructor(
    private readonly apiService: ApiService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly cookieService: CookieService,
    private readonly httpClient: HttpClient
  ) {}

  /**
   * It sends a request to the API to get the user's profile.
   * @returns The `of(true)` is being returned.
   */
  canActivate() {
    return this.httpClient
      .get<ZWayResponse<IProfile>>('/ZAutomation/api/v1/session')
      .pipe(
        map(({ data: profile }) => {
          if (
            profile.sid &&
            profile.sid === this.cookieService.get('ZWAYSession')
          ) {
            this.store.dispatch(new SetUser(profile));
            return this.router.createUrlTree(['/dashboard']);
          }
          return true;
        }),
        catchError(() =>
          this.apiService.send<IFirstAccess>('firstAccess').pipe(
            map((data) => {
              this.store.dispatch(
                new SetServerInfo(data.remote_id, data.ip_address)
              );
              return true;
            })
          )
        )
      );
  }
}
