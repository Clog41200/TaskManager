import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesManagmentComponent } from './states-managment.component';

describe('StatesManagmentComponent', () => {
  let component: StatesManagmentComponent;
  let fixture: ComponentFixture<StatesManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
