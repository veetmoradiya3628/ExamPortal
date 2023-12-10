import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddOrganizationComponent } from './admin-add-organization.component';

describe('AdminAddOrganizationComponent', () => {
  let component: AdminAddOrganizationComponent;
  let fixture: ComponentFixture<AdminAddOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
