import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Login } from '@store/local-storage/local-storage.actions';

@Component({
  selector: 'z-wave-empty-layout',
  templateUrl: './empty-layout.component.html',
  styleUrls: ['./empty-layout.component.scss'],
})
export class EmptyLayoutComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  getData(login: string, password: string): void {
    this.store.dispatch(new Login({ login, password })).subscribe(() => this.router.navigate(['/dashboard']));
  }
}
