import { Component, OnInit } from '@angular/core';
import { DynamicBaseItem } from '../dynamic-base-item';

@Component({
  selector: 'app-textarea-item',
  templateUrl: './textarea-item.component.html',
  styleUrls: ['./textarea-item.component.css']
})
export class TextareaItemComponent extends DynamicBaseItem implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
