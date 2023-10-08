import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCreateQuestionComponent } from './teacher-create-question.component';

describe('TeacherCreateQuestionComponent', () => {
  let component: TeacherCreateQuestionComponent;
  let fixture: ComponentFixture<TeacherCreateQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCreateQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCreateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
