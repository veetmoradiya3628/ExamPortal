import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminClassStudentsComponent } from './org-admin-class-students.component';

describe('OrgAdminClassStudentsComponent', () => {
  let component: OrgAdminClassStudentsComponent;
  let fixture: ComponentFixture<OrgAdminClassStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminClassStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAdminClassStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
