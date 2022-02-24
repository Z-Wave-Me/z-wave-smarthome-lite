import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';

import { catchError, map } from 'rxjs/operators';
import {
  IProfile,
  ZWayResponse,
} from '@store/local-storage/local-storage.state';
import { ApiService } from '@core/services/api/api.service';
import { SetUser } from '@store/local-storage/local-storage.actions';
import { WebsocketService } from '@core/services/websocket/websocket.service';

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
    private readonly websocketService: WebsocketService
  ) {}

  /**
   * It sends a request to the API to check if the user is logged in. If the user is logged in, it sets the user in the
   * store and returns true. If the user is not logged in, it redirects to the login page.
   * @returns An Observable<boolean | UrlTree>
   */
  canLoad(): Observable<boolean | UrlTree> {
    return this.apiService
      .send<ZWayResponse<IProfile>>('session', undefined, true)
      .pipe(
        map((response) => {
          this.websocketService.connect();
          this.store.dispatch(new SetUser(response.data));
          return true;
        }),
        catchError(() => of(this.router.createUrlTree(['/login'])))
      );
  }
}
