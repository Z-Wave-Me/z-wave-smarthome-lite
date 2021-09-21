import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Login } from '@store/local-storage/local-storage.actions';

@Component({
  selector: 'z-wave-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private store: Store, private router: Router) {}
  getData(login: string, password: string): void {
    this.store
      .dispatch(new Login({ login, password }))
      .subscribe(() => this.router.navigate(['/dashboard']));
  }
}
