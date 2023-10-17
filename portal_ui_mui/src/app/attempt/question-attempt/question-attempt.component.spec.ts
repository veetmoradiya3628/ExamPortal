import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAttemptComponent } from './question-attempt.component';

describe('QuestionAttemptComponent', () => {
  let component: QuestionAttemptComponent;
  let fixture: ComponentFixture<QuestionAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAttemptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
