import { TestBed } from '@angular/core/testing';

import { ServerStreamService } from './server-stream.service';

describe('ServerStreamService', () => {
  let service: ServerStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
