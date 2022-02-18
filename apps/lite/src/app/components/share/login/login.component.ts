import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Selector, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import {
  Login,
  SetServerInfo,
} from '@store/local-storage/local-storage.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LocalStorageState } from '@store/local-storage/local-storage.state';

@Component({
  selector: 'z-wave-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  @Select(LocalStorageState.serverInfo) serverInfo$!: Observable<{
    remoteId: number;
    ipAddress: string;
  }>;
  expanded = false;
  constructor(
    private store: Store,
    private router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      login: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z]{2,}$')],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-zA-Z])(?=.*[0-9]){6,}$'),
        ],
      ],
      mail: ['', [Validators.email]],
    });
  }
  getData(login: string, password: string): void {
    this.store
      .dispatch(new Login({ login, password }))
      .subscribe(() => this.router.navigate(['/dashboard']));
  }
}
