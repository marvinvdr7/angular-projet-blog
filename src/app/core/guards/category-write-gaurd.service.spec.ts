import { TestBed } from '@angular/core/testing';

import { CategoryWriteGaurdService } from './category-write-gaurd.service';

describe('CategoryWriteGaurdService', () => {
  let service: CategoryWriteGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryWriteGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
