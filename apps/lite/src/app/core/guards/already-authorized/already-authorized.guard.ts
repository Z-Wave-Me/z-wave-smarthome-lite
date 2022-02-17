import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  IProfile,
  ZWayResponse,
} from '@store/local-storage/local-storage.state';
import { map } from 'rxjs/operators';
import { SetUser } from '@store/local-storage/local-storage.actions';
import { ApiService } from '@core/services/api/api.service';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class AlreadyAuthorizedGuard implements CanActivate {
  constructor(
    private readonly apiService: ApiService,
    private readonly store: Store,
    private readonly router: Router
  ) {}
  canActivate() {
    return this.apiService.send<ZWayResponse<IProfile> | null>('session').pipe(
      map((response) => {
        if (response?.data.id) {
          this.store.dispatch(new SetUser(response.data));
          return this.router.createUrlTree(['/dashboard']);
        }
        return true;
      })
    );
  }
}
