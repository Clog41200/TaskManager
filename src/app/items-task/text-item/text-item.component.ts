import { Component, OnInit, Input } from '@angular/core';
import { DynamicBaseItem } from '../dynamic-base-item';

@Component({
  selector: 'app-text-item',
  templateUrl: './text-item.component.html',
  styleUrls: ['./text-item.component.css']
})
export class TextItemComponent extends DynamicBaseItem implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
