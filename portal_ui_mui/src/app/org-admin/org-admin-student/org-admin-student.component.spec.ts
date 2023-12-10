import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminStudentComponent } from './org-admin-student.component';

describe('OrgAdminStudentComponent', () => {
  let component: OrgAdminStudentComponent;
  let fixture: ComponentFixture<OrgAdminStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAdminStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
