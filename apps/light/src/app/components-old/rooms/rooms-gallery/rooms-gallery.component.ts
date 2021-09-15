import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'z-wave-rooms-gallery',
  templateUrl: './rooms-gallery.component.html',
  styleUrls: ['./rooms-gallery.component.scss'],
})
export class RoomsGalleryComponent implements OnInit {
  readonly ids$: Observable<number[]>;
  constructor(private readonly store: Store) {
    this.ids$ = store.select((state) => state.locations.ids);
  }

  ngOnInit(): void {}
}
