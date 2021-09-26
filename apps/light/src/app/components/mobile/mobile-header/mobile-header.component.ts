import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MobileTitleService } from '@core/services/mobile-title/mobile-title.service';

@Component({
  selector: 'z-wave-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
})
export class MobileHeaderComponent {
  title$: Observable<string>;

  constructor(private readonly mobileTitleService: MobileTitleService) {
    this.title$ = mobileTitleService.title$();
  }
}
