import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextItemComponent } from './rich-text-item.component';

describe('RichTextItemComponent', () => {
  let component: RichTextItemComponent;
  let fixture: ComponentFixture<RichTextItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichTextItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
