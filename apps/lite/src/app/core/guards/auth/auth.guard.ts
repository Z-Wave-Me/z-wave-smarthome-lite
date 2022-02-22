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

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private store: Store,
    private router: Router,
    private readonly apiService: ApiService
  ) {}

  canLoad(): Observable<boolean | UrlTree> {
    return this.apiService
      .send<ZWayResponse<IProfile>>('session', undefined, true)
      .pipe(
        map((response) => {
          this.store.dispatch(new SetUser(response.data));
          return true;
        }),
        catchError(() => of(this.router.createUrlTree(['/login'])))
      );
  }
}
