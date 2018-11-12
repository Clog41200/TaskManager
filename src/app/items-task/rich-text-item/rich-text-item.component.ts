import { Component, OnInit } from '@angular/core';
import { DynamicBaseItem } from '../dynamic-base-item';

@Component({
  selector: 'app-rich-text-item',
  templateUrl: './rich-text-item.component.html',
  styleUrls: ['./rich-text-item.component.css']
})
export class RichTextItemComponent extends DynamicBaseItem implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
