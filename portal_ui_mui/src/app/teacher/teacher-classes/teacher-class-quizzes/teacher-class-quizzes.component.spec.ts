import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherClassQuizzesComponent } from './teacher-class-quizzes.component';

describe('TeacherClassQuizzesComponent', () => {
  let component: TeacherClassQuizzesComponent;
  let fixture: ComponentFixture<TeacherClassQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherClassQuizzesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherClassQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
