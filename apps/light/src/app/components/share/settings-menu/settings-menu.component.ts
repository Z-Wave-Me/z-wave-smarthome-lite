import { Component, ViewChild } from '@angular/core';
import { TuiHostedDropdownComponent } from '@taiga-ui/core';
import { faUserCog } from '@fortawesome/pro-regular-svg-icons';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { takeUntil, tap } from 'rxjs/operators';
import { NightMode } from '@store/local-storage/local-storage.actions';

@Component({
  selector: 'z-wave-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
  providers: [DestroyService],
})
export class SettingsMenuComponent {
  themeSwitcher: FormControl;
  constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    private readonly destroyService$: DestroyService
  ) {
    const mode = store.selectSnapshot<boolean>(LocalStorageState.nightMode);
    this.themeSwitcher = formBuilder.control(mode);
    this.themeSwitcher.valueChanges
      .pipe(
        takeUntil(this.destroyService$),
        tap((enabled) => {
          this.store.dispatch(new NightMode(enabled));
        })
      )
      .subscribe();
  }
  faCogs = faUserCog;
  readonly items = ['Edit', 'Download', 'Rename', 'Delete'];
  open = false;
  @ViewChild(TuiHostedDropdownComponent)
  component?: TuiHostedDropdownComponent;
  onClick() {
    this.open = false;
    if (this.component && this.component.nativeFocusableElement) {
      this.component.nativeFocusableElement.focus();
    }
  }
}
