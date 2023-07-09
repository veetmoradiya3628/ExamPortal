import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgClassesMngtComponent } from './org-classes-mngt.component';

describe('OrgClassesMngtComponent', () => {
  let component: OrgClassesMngtComponent;
  let fixture: ComponentFixture<OrgClassesMngtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgClassesMngtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgClassesMngtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
