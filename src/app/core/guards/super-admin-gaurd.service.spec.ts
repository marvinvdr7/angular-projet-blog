import { TestBed } from '@angular/core/testing';

import { SuperAdminGaurdService } from './super-admin-gaurd.service';

describe('SuperAdminGaurdService', () => {
  let service: SuperAdminGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperAdminGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
