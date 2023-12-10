import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminClassQuizzesComponent } from './org-admin-class-quizzes.component';

describe('OrgAdminClassQuizzesComponent', () => {
  let component: OrgAdminClassQuizzesComponent;
  let fixture: ComponentFixture<OrgAdminClassQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAdminClassQuizzesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAdminClassQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
