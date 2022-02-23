import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '@core/services/api/api.service';
import { catchError, map } from 'rxjs/operators';
import { ZWayResponse } from '@store/local-storage/local-storage.state';
import { Store } from '@ngxs/store';
import { SetServerInfo } from '@store/local-storage/local-storage.actions';

interface IFirstAccess {
  firstaccess: boolean;
  ip_address: string;
  remote_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class FirstAccessGuard implements CanActivate {
  constructor(
    private readonly apiService: ApiService,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  /**
   * It checks if the server has been accessed before. If it has, it returns true. If it hasn't, it redirects to the login
   * page.
   * @returns An Observable<boolean | UrlTree>
   */
  canActivate(): Observable<boolean | UrlTree> {
    return (
      this.apiService
        .send<ZWayResponse<IFirstAccess>>('firstAccess', undefined, true)
        // return this.httpClient
        //   .get<ZWayResponse<IFirstAccess>>(
        //     '/ZAutomation/api/v1/system/first-access'
        //   )
        .pipe(
          map(({ data }) => {
            // data.firstaccess = true;
            this.store.dispatch(
              new SetServerInfo(data.remote_id, data.ip_address)
            );
            return data.firstaccess
              ? true
              : this.router.createUrlTree(['/login']);
          }),
          catchError(() => of(this.router.createUrlTree(['/login'])))
        )
    );
  }
}
