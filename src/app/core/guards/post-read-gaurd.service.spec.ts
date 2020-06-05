import { TestBed } from '@angular/core/testing';

import { PostReadGaurdService } from './post-read-gaurd.service';

describe('PostReadGaurdService', () => {
  let service: PostReadGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostReadGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
