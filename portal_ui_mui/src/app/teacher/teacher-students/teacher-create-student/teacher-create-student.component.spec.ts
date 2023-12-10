import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCreateStudentComponent } from './teacher-create-student.component';

describe('TeacherCreateStudentComponent', () => {
  let component: TeacherCreateStudentComponent;
  let fixture: ComponentFixture<TeacherCreateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCreateStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherCreateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
