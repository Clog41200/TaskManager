import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsManagmentComponent } from './rights-managment.component';

describe('RightsManagmentComponent', () => {
  let component: RightsManagmentComponent;
  let fixture: ComponentFixture<RightsManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightsManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
