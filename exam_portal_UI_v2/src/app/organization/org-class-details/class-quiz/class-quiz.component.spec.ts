import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassQuizComponent } from './class-quiz.component';

describe('ClassQuizComponent', () => {
  let component: ClassQuizComponent;
  let fixture: ComponentFixture<ClassQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
