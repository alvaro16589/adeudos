import { TestBed } from '@angular/core/testing';

import { TypeJobService } from './type-job.service';

describe('TypeJobService', () => {
  let service: TypeJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
