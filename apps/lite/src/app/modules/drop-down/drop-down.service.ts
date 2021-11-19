import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DropDownService implements OnDestroy {
  private readonly menu$ = new BehaviorSubject(false);

  get isOpen(): Observable<boolean> {
    return this.menu$.asObservable();
  }

  toggleMenu(): void {
    this.menu$.next(!this.menu$.getValue());
  }

  closeMenu(): void {
    this.menu$.next(false);
  }

  openMenu(): void {
    this.menu$.next(true);
  }

  ngOnDestroy(): void {
    this.menu$.next(false);
    this.menu$.complete();
  }
}
