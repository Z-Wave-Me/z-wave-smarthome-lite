import { TestBed } from '@angular/core/testing';

import { RestorePositionService } from './restore-position.service';

describe('RestorePositionService', () => {
  let service: RestorePositionService<any, any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestorePositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
