import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherClassStudentsComponent } from './teacher-class-students.component';

describe('TeacherClassStudentsComponent', () => {
  let component: TeacherClassStudentsComponent;
  let fixture: ComponentFixture<TeacherClassStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherClassStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherClassStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
