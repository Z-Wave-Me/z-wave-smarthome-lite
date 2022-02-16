import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface AuthData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  // @ts-ignore
  login({ username, password }): Observable<{ token: string }> {
    return new Observable<{ token: string }>();
  }

  logout(token: string | undefined): Observable<any> {
    return new Observable();
  }
}
