import { TestBed } from '@angular/core/testing';

import { RoleWriteGaurdService } from './role-write-gaurd.service';

describe('RoleWriteGaurdService', () => {
  let service: RoleWriteGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleWriteGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
