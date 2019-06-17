import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFrontComponent } from './main-front.component';

describe('MainFrontComponent', () => {
  let component: MainFrontComponent;
  let fixture: ComponentFixture<MainFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
