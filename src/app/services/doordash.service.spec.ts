import { TestBed } from '@angular/core/testing';

import { DoordashService } from './doordash.service';

describe('DoordashService', () => {
  let service: DoordashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoordashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
