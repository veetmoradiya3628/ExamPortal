import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQuizAttemptsComponent } from './teacher-quiz-attempts.component';

describe('TeacherQuizAttemptsComponent', () => {
  let component: TeacherQuizAttemptsComponent;
  let fixture: ComponentFixture<TeacherQuizAttemptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherQuizAttemptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherQuizAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
