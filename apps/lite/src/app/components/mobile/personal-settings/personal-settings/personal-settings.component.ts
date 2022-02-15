import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import {
  IProfile,
  LocalStorageState,
} from '@store/local-storage/local-storage.state';
import { TranslocoService } from '@ngneat/transloco';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { map, takeUntil, tap } from 'rxjs/operators';
import {
  SetProfile,
  UpdateProfile,
} from '@store/local-storage/local-storage.actions';

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
  settings: FormGroup;
  profile: IProfile;
  languages: Lang[];
  constructor(
    private readonly formBuilder: FormBuilder,
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
      mail: [this.profile.email, [Validators.email]],
      lang: [
        this.languages.find(
          (lang) => lang.id === this.translocoService.getActiveLang()
        ),
      ],
    });
  }

  ngAfterViewInit(): void {
    this.settings.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        map((values) => {
          if (this.settings.valid) {
            this.store.dispatch(
              new SetProfile({
                name: values.name,
                email: values.mail,
                lang: values.lang.id,
                synchronized: false,
              })
            );
            return 'success';
          }
          return 'error';
        })
      )
      .subscribe();
  }
}
