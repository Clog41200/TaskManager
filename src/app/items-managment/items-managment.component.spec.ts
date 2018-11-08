import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsManagmentComponent } from './items-managment.component';

describe('ItemsManagmentComponent', () => {
  let component: ItemsManagmentComponent;
  let fixture: ComponentFixture<ItemsManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
