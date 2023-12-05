import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQuizInfoComponent } from './teacher-quiz-info.component';

describe('TeacherQuizInfoComponent', () => {
  let component: TeacherQuizInfoComponent;
  let fixture: ComponentFixture<TeacherQuizInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherQuizInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherQuizInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
