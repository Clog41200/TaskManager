import { Component, OnInit } from '@angular/core';
import { DynamicBaseItem } from '../dynamic-base-item';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.css']
})
export class SelectItemComponent extends DynamicBaseItem implements OnInit {

  public values: Array<any>;

  constructor() {
    super();
  }

  ngOnInit() {
    this.values = JSON.parse(this.item.options);
  }
  }
