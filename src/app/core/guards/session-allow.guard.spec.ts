import { TestBed } from '@angular/core/testing';

import { SessionAllowGuard } from './session-allow.guard';

describe('SessionAllowGuard', () => {
  let guard: SessionAllowGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SessionAllowGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
