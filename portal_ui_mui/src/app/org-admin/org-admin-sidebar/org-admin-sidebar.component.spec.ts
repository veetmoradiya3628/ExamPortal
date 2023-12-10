import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminSidebarComponent } from './org-admin-sidebar.component';

describe('OrgAdminSidebarComponent', () => {
  let component: OrgAdminSidebarComponent;
  let fixture: ComponentFixture<OrgAdminSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAdminSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
