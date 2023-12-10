import { TestBed } from '@angular/core/testing';

import { OrgAdminServiceService } from './org-admin-service.service';

describe('OrgAdminServiceService', () => {
  let service: OrgAdminServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgAdminServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
