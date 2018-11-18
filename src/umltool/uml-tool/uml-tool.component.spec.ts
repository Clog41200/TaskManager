import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmlToolComponent } from './uml-tool.component';

describe('UmlToolComponent', () => {
  let component: UmlToolComponent;
  let fixture: ComponentFixture<UmlToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmlToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmlToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
