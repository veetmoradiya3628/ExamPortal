import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminCreateStudentComponent } from './org-admin-create-student.component';

describe('OrgAdminCreateStudentComponent', () => {
  let component: OrgAdminCreateStudentComponent;
  let fixture: ComponentFixture<OrgAdminCreateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminCreateStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAdminCreateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
