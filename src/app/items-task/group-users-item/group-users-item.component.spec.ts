import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupUsersItemComponent } from './group-users-item.component';

describe('GroupUsersItemComponent', () => {
  let component: GroupUsersItemComponent;
  let fixture: ComponentFixture<GroupUsersItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupUsersItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupUsersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
