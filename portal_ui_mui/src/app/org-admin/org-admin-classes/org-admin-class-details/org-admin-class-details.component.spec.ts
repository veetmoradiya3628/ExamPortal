import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminClassDetailsComponent } from './org-admin-class-details.component';

describe('OrgAdminClassDetailsComponent', () => {
  let component: OrgAdminClassDetailsComponent;
  let fixture: ComponentFixture<OrgAdminClassDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminClassDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAdminClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
