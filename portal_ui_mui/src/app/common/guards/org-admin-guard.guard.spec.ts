import { TestBed } from '@angular/core/testing';

import { OrgAdminGuardGuard } from './org-admin-guard.guard';

describe('OrgAdminGuardGuard', () => {
  let guard: OrgAdminGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrgAdminGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
