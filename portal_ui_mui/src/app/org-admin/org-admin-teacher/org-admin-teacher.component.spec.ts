import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminTeacherComponent } from './org-admin-teacher.component';

describe('OrgAdminTeacherComponent', () => {
  let component: OrgAdminTeacherComponent;
  let fixture: ComponentFixture<OrgAdminTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAdminTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
