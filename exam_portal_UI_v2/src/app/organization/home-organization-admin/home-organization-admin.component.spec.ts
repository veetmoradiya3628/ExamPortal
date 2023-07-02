import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOrganizationAdminComponent } from './home-organization-admin.component';

describe('HomeOrganizationAdminComponent', () => {
  let component: HomeOrganizationAdminComponent;
  let fixture: ComponentFixture<HomeOrganizationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeOrganizationAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeOrganizationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
