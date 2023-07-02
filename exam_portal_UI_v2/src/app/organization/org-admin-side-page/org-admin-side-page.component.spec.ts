import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminSidePageComponent } from './org-admin-side-page.component';

describe('OrgAdminSidePageComponent', () => {
  let component: OrgAdminSidePageComponent;
  let fixture: ComponentFixture<OrgAdminSidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminSidePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAdminSidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
