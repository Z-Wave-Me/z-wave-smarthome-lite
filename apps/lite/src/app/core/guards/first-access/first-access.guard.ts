import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { ApiService } from '@core/services/api/api.service';
import { map, tap } from 'rxjs/operators';
import {
  IProfile,
  ZWayResponse,
} from '@store/local-storage/local-storage.state';
import { Store } from '@ngxs/store';
import {
  SetServerInfo,
  SetUser,
} from '@store/local-storage/local-storage.actions';
import { AuthGuard } from '@core/guards/auth/auth.guard';

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
    private readonly router: Router,
    private readonly authGuard: AuthGuard
  ) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.apiService.send<ZWayResponse<IFirstAccess>>('firstAccess').pipe(
      map(({ data }) => {
        data.firstaccess = true;
        this.store.dispatch(new SetServerInfo(data.remote_id, data.ip_address));
        if (data.firstaccess) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
