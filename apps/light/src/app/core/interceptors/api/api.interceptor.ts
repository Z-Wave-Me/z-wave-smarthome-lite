import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ServerStatus } from '@store/locals/locals.actions';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { Logout } from '@store/local-storage/local-storage.actions';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let errorsCount = 0;
    const token = this.store.selectSnapshot(LocalStorageState.token);
    // this.store.selectSnapshot<string>(AuthState.token);
    if (token) {
      request = request.clone({
        setHeaders: {
          ZWAYSession: token,
        },
      });
    }
    // console.log(request);
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.store.dispatch(new ServerStatus(true));
            errorsCount = 0;
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            console.log('Error from Inspector', err);
            if (err.status === 401) {
              this.store.dispatch(new Logout());
              console.log('Unauthorized');
            }
            if (err.status === 0) {
              this.store.dispatch(new ServerStatus(false));
              console.warn('offline');
            }
          }
        },
      ),
      // retryWhen((errors) => {
      //     errorsCount++;
      //     console.log({ errorsCount });
      //     return errors.pipe(
      //     delay((errorsCount * 1000),
      //     tap(() => {
      //     }),
      //     take(100),
      //     // @ts-ignore
      //     concat(throwError('Never')),
      //   );
      // }
      // ),
      // catchError((err => throwError('WE ARE HERE')))
    );
  }
}
