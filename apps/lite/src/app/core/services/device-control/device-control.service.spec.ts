import { TestBed } from '@angular/core/testing';

import { DeviceControlService } from './device-control.service';

describe('DeviceControlService', () => {
  let service: DeviceControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
