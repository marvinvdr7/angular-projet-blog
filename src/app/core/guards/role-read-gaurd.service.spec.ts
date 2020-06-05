import { TestBed } from '@angular/core/testing';

import { RoleReadGaurdService } from './role-read-gaurd.service';

describe('RoleReadGaurdService', () => {
  let service: RoleReadGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleReadGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
