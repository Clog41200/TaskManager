import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveCategorieComponent } from './recursive-categorie.component';

describe('RecursiveCategorieComponent', () => {
  let component: RecursiveCategorieComponent;
  let fixture: ComponentFixture<RecursiveCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursiveCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursiveCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
