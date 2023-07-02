import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementOrgComponent } from './user-management-org.component';

describe('UserManagementOrgComponent', () => {
  let component: UserManagementOrgComponent;
  let fixture: ComponentFixture<UserManagementOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementOrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
