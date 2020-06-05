import { TestBed } from '@angular/core/testing';

import { CategoryReadGaurdService } from './category-read-gaurd.service';

describe('CategoryReadGaurdService', () => {
  let service: CategoryReadGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryReadGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
