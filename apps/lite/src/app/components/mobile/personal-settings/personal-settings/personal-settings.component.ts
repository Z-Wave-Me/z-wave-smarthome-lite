import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import {
  IProfile,
  LocalStorageState,
} from '@store/local-storage/local-storage.state';
import { TranslocoService } from '@ngneat/transloco';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { filter, map, pluck, takeUntil } from 'rxjs/operators';
import { SetProfile } from '@store/local-storage/local-storage.actions';
import { environment } from '../../../../../environments/environment';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DevicesStateModel } from '@store/devices/devices.state';

class Lang {
  private static readonly apiUrl = 'assets/img/flags/';
  private static readonly lang: { [key: string]: string } = {
    en: 'English',
    ru: 'Русский',
  };
  readonly img: string;
  readonly title: string;

  constructor(readonly id: string) {
    this.img = Lang.apiUrl + this.id + '.png';
    this.title = Lang.lang?.[id] ?? id;
  }
}

@Component({
  selector: 'z-wave-personal-settings',
  templateUrl: './personal-settings.component.html',
  styleUrls: ['./personal-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class PersonalSettingsComponent implements AfterViewInit {
  settings: UntypedFormGroup;
  profile: IProfile;
  languages: Lang[];
  hiddenDevices$: Observable<{ id: string; title: string }[]>;
  version = environment.version;
  faMobileAlt = faMobileAlt;

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly store: Store,
    private readonly translocoService: TranslocoService,
    private readonly destroy$: TuiDestroyService
  ) {
    this.languages = this.translocoService
      .getAvailableLangs()
      .map((lang) => new Lang(lang.toString()));
    this.profile = this.store.selectSnapshot(LocalStorageState.profile);
    this.settings = this.formBuilder.group({
      name: [this.profile.name, [Validators.required]],
      email: [this.profile.email, [Validators.email]],
      lang: [
        this.languages.find(
          (lang) => lang.id === this.translocoService.getActiveLang()
        ),
      ],
      hideSystemEvents: [this.profile.hideSystemEvents],
      hideAllDeviceEvents: [this.profile.hideAllDeviceEvents],
    });
    this.hiddenDevices$ = this.store.select(LocalStorageState.profile).pipe(
      pluck('hideSingleDeviceEvents'),
      filter((hideSingleDeviceEvents) => Array.isArray(hideSingleDeviceEvents)),
      map((hideSingleDeviceEvents) =>
        hideSingleDeviceEvents.map((id) => ({
          id,
          title: this.store.selectSnapshot(
            ({ devices }: { devices: DevicesStateModel }) =>
              devices.entities[id]?.title
          ),
        }))
      )
    );
  }

  ngAfterViewInit(): void {
    this.settings.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        map((values) => {
          if (this.settings.valid) {
            const { lang, ...updated } = values;
            updated.lang = lang.id;
            updated.synchronized = false;
            this.store.dispatch(new SetProfile(updated));
            return 'success';
          }
          return 'error';
        })
      )
      .subscribe();
  }

  /**
   * Remove the given device ID from the list of hidden devices
   * @param {string} removeId - string
   */
  excludeFromHidden(removeId: string) {
    this.store.dispatch(
      new SetProfile({
        hideSingleDeviceEvents: this.store
          .selectSnapshot(LocalStorageState.profile)
          .hideSingleDeviceEvents.filter((id) => id !== removeId),
        synchronized: false,
      })
    );
  }
}
