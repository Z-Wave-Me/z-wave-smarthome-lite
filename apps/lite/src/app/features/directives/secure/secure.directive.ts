import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { config, Role } from './config';
import { LocalStorageState } from '@store/local-storage/local-storage.state';

@Directive({
  selector: '[zWaveSecure]',
})
export class SecureDirective {
  constructor(
    private readonly templateRef: TemplateRef<never>,
    private readonly viewContainer: ViewContainerRef,
    private readonly store: Store
  ) {}

  @Input()
  set zWaveSecure(role: Role) {
    const userRole = this.store.selectSnapshot(LocalStorageState.profile).role;
    if (config[role].find((availableRoles) => availableRoles === userRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
