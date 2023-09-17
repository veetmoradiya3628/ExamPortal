import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminHomePageComponent } from './org-admin-home-page.component';

describe('OrgAdminHomePageComponent', () => {
  let component: OrgAdminHomePageComponent;
  let fixture: ComponentFixture<OrgAdminHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAdminHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
