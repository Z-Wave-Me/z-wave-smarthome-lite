import { TestBed } from '@angular/core/testing';

import { AlreadyAuthorizedGuard } from './already-authorized.guard';

describe('AlreadyAuthorizedGuard', () => {
  let guard: AlreadyAuthorizedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlreadyAuthorizedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
