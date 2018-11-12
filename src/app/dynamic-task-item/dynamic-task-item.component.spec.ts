import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTaskItemComponent } from './dynamic-task-item.component';

describe('DynamicTaskItemComponent', () => {
  let component: DynamicTaskItemComponent;
  let fixture: ComponentFixture<DynamicTaskItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTaskItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
