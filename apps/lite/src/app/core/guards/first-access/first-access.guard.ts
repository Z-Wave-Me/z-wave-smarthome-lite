import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api/api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirstAccessGuard implements CanActivate {
  constructor(private readonly apiService: ApiService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.apiService.send('firstAccess').pipe(tap(console.log)).subscribe();

    return true;
  }
}
