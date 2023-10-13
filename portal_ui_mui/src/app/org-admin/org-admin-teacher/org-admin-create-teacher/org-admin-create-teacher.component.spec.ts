import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminCreateTeacherComponent } from './org-admin-create-teacher.component';

describe('OrgAdminCreateTeacherComponent', () => {
  let component: OrgAdminCreateTeacherComponent;
  let fixture: ComponentFixture<OrgAdminCreateTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminCreateTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAdminCreateTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
