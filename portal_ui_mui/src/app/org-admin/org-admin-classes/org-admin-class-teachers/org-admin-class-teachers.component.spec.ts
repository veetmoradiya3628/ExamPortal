import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminClassTeachersComponent } from './org-admin-class-teachers.component';

describe('OrgAdminClassTeachersComponent', () => {
  let component: OrgAdminClassTeachersComponent;
  let fixture: ComponentFixture<OrgAdminClassTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminClassTeachersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAdminClassTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
