import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { config, Role } from './config';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appSecure]',
})
export class SecureDirective implements OnDestroy {
  private subscription?: Subscription;
  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store
  ) {}
  @Input()
  set appSecure(role: Role) {
    this.subscription = this.store
      .select<number>((state) => state.localStorage.role)
      .subscribe((code) => {
        if (config[role].indexOf(code) !== -1) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
