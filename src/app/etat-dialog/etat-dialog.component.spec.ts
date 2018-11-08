import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatDialogComponent } from './etat-dialog.component';

describe('EtatDialogComponent', () => {
  let component: EtatDialogComponent;
  let fixture: ComponentFixture<EtatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
