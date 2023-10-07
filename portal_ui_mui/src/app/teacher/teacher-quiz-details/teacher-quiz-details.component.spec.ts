import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQuizDetailsComponent } from './teacher-quiz-details.component';

describe('TeacherQuizDetailsComponent', () => {
  let component: TeacherQuizDetailsComponent;
  let fixture: ComponentFixture<TeacherQuizDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherQuizDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherQuizDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
