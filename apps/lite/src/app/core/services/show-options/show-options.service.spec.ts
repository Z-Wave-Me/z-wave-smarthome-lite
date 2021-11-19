import { TestBed } from '@angular/core/testing';

import { ShowOptionsService } from './show-options.service';

describe('ShowOptionsService', () => {
  let service: ShowOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
