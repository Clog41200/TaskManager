import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UMLClassesComponent } from './umlclasses.component';

describe('UMLClassesComponent', () => {
  let component: UMLClassesComponent;
  let fixture: ComponentFixture<UMLClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UMLClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UMLClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
