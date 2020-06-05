import { TestBed } from '@angular/core/testing';

import { MembreWriteGaurdService } from './membre-write-gaurd.service';

describe('MembreWriteGaurdService', () => {
  let service: MembreWriteGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembreWriteGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
