import { TestBed } from '@angular/core/testing';

import { ServerSynchronizationService } from './server-synchronization.service';

describe('ServerSynchronizationService', () => {
  let service: ServerSynchronizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerSynchronizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
