import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuizInfoComponent } from './student-quiz-info.component';

describe('StudentQuizInfoComponent', () => {
  let component: StudentQuizInfoComponent;
  let fixture: ComponentFixture<StudentQuizInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentQuizInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentQuizInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
