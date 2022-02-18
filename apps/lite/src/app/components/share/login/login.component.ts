import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Login } from '@store/local-storage/local-storage.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { catchError, first, map } from 'rxjs/operators';
import { ApiService } from '@core/services/api/api.service';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'z-wave-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This field is required',
        email: 'Please enter a valid email address',
      },
    },
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  restoreForm: FormGroup;
  @Select(LocalStorageState.serverInfo) serverInfo$!: Observable<{
    remoteId: number;
    ipAddress: string;
  }>;
  expanded = false;
  loading = false;

  constructor(
    private store: Store,
    private router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly apiService: ApiService,
    private readonly notificationsService: TuiNotificationsService,
    private readonly translocoService: TranslocoService
  ) {
    this.restoreForm = formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
    });
    this.loginForm = formBuilder.group({
      login: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z]*$')],
      ],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.loading = true;
      const { password, login } = this.loginForm.value;
      this.loginForm.get('password')?.setValue('');
      this.apiService
        .send<{ data: { sid: string; id: number } }>('login', {
          data: { password, login },
        })
        .pipe(
          first(),
          map(({ data: { id } }) => {
            this.store.dispatch(new Login(id));
            return this.router.navigate(['./dashboard']);
          }),
          catchError(() => {
            this.loading = false;
            this.loginForm.get('password')?.setErrors({
              other: this.translocoService.translate('error_load_user'),
            });
            return of(true);
          })
        )
        .subscribe();
    }
  }

  restore() {
    this.restoreForm.markAllAsTouched();
    if (this.restoreForm.valid) {
      console.log('VALID');
      this.notificationsService
        .show('Пароль отправлен по почте', {
          label: 'Восстановление пароля',
          status: TuiNotification.Success,
        })
        .subscribe();
      this.expanded = false;
    }
  }
}
