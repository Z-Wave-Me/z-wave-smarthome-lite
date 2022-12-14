import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {
  IProfile,
  ZWayResponse,
} from '@store/local-storage/local-storage.state';
import { catchError, map } from 'rxjs/operators';
import { SetUser } from '@store/local-storage/local-storage.actions';
import { ApiService } from '@core/services/api/api.service';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';

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
    private readonly router: Router
  ) {}

  /**
   * It sends a request to the API to get the user's profile.
   * @returns The `of(true)` is being returned.
   */
  canActivate() {
    return this.apiService.send<ZWayResponse<IProfile>>('session').pipe(
      map((response) => {
        if (response) this.store.dispatch(new SetUser(response.data));
        return this.router.createUrlTree(['/dashboard']);
      }),
      catchError(() => of(true))
    );
  }
}
