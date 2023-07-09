import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSidePageComponent } from './teacher-side-page.component';

describe('TeacherSidePageComponent', () => {
  let component: TeacherSidePageComponent;
  let fixture: ComponentFixture<TeacherSidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherSidePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherSidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
