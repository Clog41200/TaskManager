import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsDialogComponent } from './rights-dialog.component';

describe('RightsDialogComponent', () => {
  let component: RightsDialogComponent;
  let fixture: ComponentFixture<RightsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
