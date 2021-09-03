import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { Pages, ShowOptions, SupportFilters } from '@modules/interfaces/pages.interfaces';
import { Observable } from 'rxjs';
import { LocalStorageState } from '@store/local-storage/local-storage.state';

export const showOptionsFactory = (place: Pages) => (store: Store, activatedRoute: ActivatedRoute) =>
  new ShowOptionsService(store, activatedRoute).initWith(place);

@Injectable({
  providedIn: 'any',
})
export class ShowOptionsService {
  private place!: Pages;
  private options?: Observable<ShowOptions>;
  constructor(private readonly store: Store, private readonly activatedRoute: ActivatedRoute) {}

  initWith(place: Pages): ShowOptionsService {
    this.place = place;
    console.log('initional with', place);
    return this;
  }

  get filter(): Pages {
    return this.place;
  }
}
