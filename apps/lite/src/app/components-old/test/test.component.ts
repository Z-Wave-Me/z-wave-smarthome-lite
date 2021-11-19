import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RemoveUser, SetUser } from '@store/user/user.actions';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { UserState } from '@store/user/user.state';
import { ApiService } from '@core/services/api/api.service';
import { StateResetAll } from 'ngxs-reset-plugin';
import { Logout } from '@store/local-storage/local-storage.actions';

@Component({
  selector: 'z-wave-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  @Select(UserState.getUser) user$?: Observable<User>;
  constructor(private store: Store, private apiService: ApiService) {}
  ngOnInit(): void {}
  addUser(name: string): void {
    this.store.dispatch(new SetUser({ name }));
  }
  remove(): void {
    this.store.dispatch(new Logout());
  }
  getApi(data: string, params?: { key: string; value: string }[]): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.apiService
      .send('locations')
      .subscribe((data) => console.log('api', data));
  }
  reset(): void {
    this.store.dispatch(new StateResetAll());
  }
}
