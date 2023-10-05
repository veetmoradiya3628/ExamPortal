import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttemptsComponent } from './student-attempts.component';

describe('StudentAttemptsComponent', () => {
  let component: StudentAttemptsComponent;
  let fixture: ComponentFixture<StudentAttemptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAttemptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
