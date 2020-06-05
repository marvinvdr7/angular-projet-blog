import { TestBed } from '@angular/core/testing';

import { PostWriteGaurdService } from './post-write-gaurd.service';

describe('PostWriteGaurdService', () => {
  let service: PostWriteGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostWriteGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
