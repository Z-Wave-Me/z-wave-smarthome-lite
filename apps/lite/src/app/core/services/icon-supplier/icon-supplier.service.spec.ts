import { TestBed } from '@angular/core/testing';

import { IconSupplierService } from './icon-supplier.service';

describe('IconSupplierService', () => {
  let service: IconSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
