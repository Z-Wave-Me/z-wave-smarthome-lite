import { TestBed } from '@angular/core/testing';

import { MobileTitleService } from './mobile-title.service';

describe('MobileTitleService', () => {
  let service: MobileTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
