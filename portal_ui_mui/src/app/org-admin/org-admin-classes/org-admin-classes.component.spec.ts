import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminClassesComponent } from './org-admin-classes.component';

describe('OrgAdminClassesComponent', () => {
  let component: OrgAdminClassesComponent;
  let fixture: ComponentFixture<OrgAdminClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminClassesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAdminClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
