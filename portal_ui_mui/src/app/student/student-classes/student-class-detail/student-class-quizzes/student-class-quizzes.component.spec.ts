import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClassQuizzesComponent } from './student-class-quizzes.component';

describe('StudentClassQuizzesComponent', () => {
  let component: StudentClassQuizzesComponent;
  let fixture: ComponentFixture<StudentClassQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentClassQuizzesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentClassQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
