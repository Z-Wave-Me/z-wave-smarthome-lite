import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api/api.service';
import { map } from 'rxjs/operators';
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

  canActivate(): Observable<boolean | UrlTree> {
    return this.apiService
      .send<ZWayResponse<IFirstAccess>>('firstAccess', undefined, true)
      .pipe(
        map(({ data }) => {
          // data.firstaccess = true;
          this.store.dispatch(
            new SetServerInfo(data.remote_id, data.ip_address)
          );
          return data.firstaccess
            ? true
            : this.router.createUrlTree(['/login']);
        })
      );
  }
}
