import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgStudentMngtComponent } from './org-student-mngt.component';

describe('OrgStudentMngtComponent', () => {
  let component: OrgStudentMngtComponent;
  let fixture: ComponentFixture<OrgStudentMngtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgStudentMngtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgStudentMngtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
