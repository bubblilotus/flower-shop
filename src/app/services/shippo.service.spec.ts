import { TestBed } from '@angular/core/testing';

import { ShipppService } from './shippp.service';

describe('ShipppService', () => {
  let service: ShipppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
