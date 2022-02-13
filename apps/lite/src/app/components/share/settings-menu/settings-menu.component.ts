import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { TuiHostedDropdownComponent } from '@taiga-ui/core';
import { faUserCog } from '@fortawesome/pro-regular-svg-icons';
import { FormBuilder, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { LocalStorageState } from '@store/local-storage/local-storage.state';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { NightMode } from '@store/local-storage/local-storage.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'z-wave-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsMenuComponent {
  themeSwitcher?: FormControl;
  @Select(LocalStorageState.nightMode) nightMode$!: Observable<boolean>;

  open = false;

  readonly webApis = [
    'Common',
    'Audio',
    'Canvas',
    'Geolocation',
    'MIDI',
    'Workers',
  ];

  readonly tinkoff = [
    'Taiga-UI',
    'ng-event-plugins',
    'ng-polymorpheus',
    'ng-dompurify',
  ];

  constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    private readonly destroyService$: DestroyService
  ) {
    this.nightMode$
      .pipe(
        takeUntil(this.destroyService$),
        switchMap((mode) => {
          this.themeSwitcher = formBuilder.control(mode);
          return this.themeSwitcher.valueChanges;
        }),
        tap((enabled) => {
          this.store.dispatch(new NightMode(enabled));
        })
      )
      .subscribe();
  }
  faCogs = faUserCog;
  // readonly items = ['Edit', 'Download', 'Rename', 'Delete'];
  toggle(open: boolean) {
    this.open = open;
  }
}
