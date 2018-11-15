import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationIndicatorComponent } from './notification-indicator.component';

describe('NotificationIndicatorComponent', () => {
  let component: NotificationIndicatorComponent;
  let fixture: ComponentFixture<NotificationIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
