import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassPostSectionComponent } from './class-post-section.component';

describe('ClassPostSectionComponent', () => {
  let component: ClassPostSectionComponent;
  let fixture: ComponentFixture<ClassPostSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassPostSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassPostSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
