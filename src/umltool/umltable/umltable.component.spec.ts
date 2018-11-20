import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UMLTableComponent } from './umltable.component';

describe('UMLTableComponent', () => {
  let component: UMLTableComponent;
  let fixture: ComponentFixture<UMLTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UMLTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UMLTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
