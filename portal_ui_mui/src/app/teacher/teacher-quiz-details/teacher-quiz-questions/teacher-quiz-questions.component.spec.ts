import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQuizQuestionsComponent } from './teacher-quiz-questions.component';

describe('TeacherQuizQuestionsComponent', () => {
  let component: TeacherQuizQuestionsComponent;
  let fixture: ComponentFixture<TeacherQuizQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherQuizQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherQuizQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
