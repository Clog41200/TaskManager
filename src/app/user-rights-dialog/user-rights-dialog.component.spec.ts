import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRightsDialogComponent } from './user-rights-dialog.component';

describe('UserRightsDialogComponent', () => {
  let component: UserRightsDialogComponent;
  let fixture: ComponentFixture<UserRightsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRightsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRightsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
