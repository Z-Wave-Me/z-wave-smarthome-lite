import { TestBed } from '@angular/core/testing';

import { MobileActionsService } from './mobile-actions.service';

describe('MobileActionsService', () => {
  let service: MobileActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
