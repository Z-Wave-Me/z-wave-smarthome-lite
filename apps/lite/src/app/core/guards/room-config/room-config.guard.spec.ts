import { TestBed } from '@angular/core/testing';

import { RoomConfigGuard } from './room-config.guard';

describe('RoomConfigGuard', () => {
  let guard: RoomConfigGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoomConfigGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
