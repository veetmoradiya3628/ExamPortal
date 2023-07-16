import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgTeacherMngtComponent } from './org-teacher-mngt.component';

describe('OrgTeacherMngtComponent', () => {
  let component: OrgTeacherMngtComponent;
  let fixture: ComponentFixture<OrgTeacherMngtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgTeacherMngtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgTeacherMngtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
