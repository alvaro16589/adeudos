import { TestBed } from '@angular/core/testing';

import { IsRootGuard } from './is-root.guard';

describe('IsRootGuard', () => {
  let guard: IsRootGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsRootGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
