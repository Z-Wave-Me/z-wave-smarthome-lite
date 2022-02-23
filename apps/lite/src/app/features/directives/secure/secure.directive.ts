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
import { LocalStorageState } from '@store/local-storage/local-storage.state';

@Directive({
  selector: '[zWaveSecure]',
})
export class SecureDirective implements OnDestroy {
  private subscription?: Subscription;
  constructor(
    private readonly element: ElementRef,
    private readonly templateRef: TemplateRef<never>,
    private readonly viewContainer: ViewContainerRef,
    private readonly store: Store
  ) {}
  @Input()
  set appSecure(role: Role) {
    this.subscription = this.store
      .select(LocalStorageState.profile)
      .subscribe(({ role: code }) => {
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
