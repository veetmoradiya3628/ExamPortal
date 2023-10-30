import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQuizStudentsComponent } from './teacher-quiz-students.component';

describe('TeacherQuizStudentsComponent', () => {
  let component: TeacherQuizStudentsComponent;
  let fixture: ComponentFixture<TeacherQuizStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherQuizStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherQuizStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
