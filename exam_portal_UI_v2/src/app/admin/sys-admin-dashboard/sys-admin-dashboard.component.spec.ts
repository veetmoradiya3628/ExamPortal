import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysAdminDashboardComponent } from './sys-admin-dashboard.component';

describe('SysAdminDashboardComponent', () => {
  let component: SysAdminDashboardComponent;
  let fixture: ComponentFixture<SysAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysAdminDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
