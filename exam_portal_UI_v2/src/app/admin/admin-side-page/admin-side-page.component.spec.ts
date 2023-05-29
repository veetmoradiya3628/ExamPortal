import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidePageComponent } from './admin-side-page.component';

describe('AdminSidePageComponent', () => {
  let component: AdminSidePageComponent;
  let fixture: ComponentFixture<AdminSidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSidePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
