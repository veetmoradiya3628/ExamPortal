import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgClassDetailsComponent } from './org-class-details.component';

describe('OrgClassDetailsComponent', () => {
  let component: OrgClassDetailsComponent;
  let fixture: ComponentFixture<OrgClassDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgClassDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
