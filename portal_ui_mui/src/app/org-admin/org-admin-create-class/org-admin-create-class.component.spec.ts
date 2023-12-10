import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminCreateClassComponent } from './org-admin-create-class.component';

describe('OrgAdminCreateClassComponent', () => {
  let component: OrgAdminCreateClassComponent;
  let fixture: ComponentFixture<OrgAdminCreateClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminCreateClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAdminCreateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
