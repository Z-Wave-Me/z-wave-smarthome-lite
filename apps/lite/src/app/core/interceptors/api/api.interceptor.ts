import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ServerStatus } from '@store/locals/locals.actions';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { Logout } from '@store/local-storage/local-storage.actions';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private store: Store, private readonly router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    // let errorsCount = 0;
    // const token = this.store.selectSnapshot(LocalStorageState.token);
    // // this.store.selectSnapshot<string>(AuthState.token);
    // if (token) {
    //   request = request.clone({
    //     setHeaders: {
    //       ZWAYSession: token,
    //     },
    //   });
    // }

    // console.log(request);
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.store.dispatch(new ServerStatus(true));
          // errorsCount = 0;
        }
      }),
      catchError((err) => {
        console.warn('http error: ', err.status, err.message);
        if (err.status === 0) {
          this.store.dispatch(new ServerStatus(false));
          console.warn('offline');
        }
        // if (err.status === 401) return this.router.navigate(['login']);
        return throwError(err);
      })
      // tap({
      //   next: (event) => {
      //     if (event instanceof HttpResponse) {
      //       this.store.dispatch(new ServerStatus(true));
      //       // errorsCount = 0;
      //     }
      //   },
      //   error: (err) => {
      //     if (err instanceof HttpErrorResponse) {
      //       console.log('Error from Inspector', err);
      //       if (err.status === 401) {
      //         this.store.dispatch(new Logout());
      //         console.log('Unauthorized');
      //       }
      //       if (err.status === 0) {
      //         this.store.dispatch(new ServerStatus(false));
      //         console.warn('offline');
      //       }
      //     }
      //   },
      // })
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
