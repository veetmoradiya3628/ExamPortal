import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuizAttamptsComponent } from './student-quiz-attampts.component';

describe('StudentQuizAttamptsComponent', () => {
  let component: StudentQuizAttamptsComponent;
  let fixture: ComponentFixture<StudentQuizAttamptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentQuizAttamptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentQuizAttamptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
