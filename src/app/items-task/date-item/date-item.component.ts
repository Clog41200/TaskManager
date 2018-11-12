
import { Component, OnInit } from '@angular/core';
import { DynamicBaseItem } from '../dynamic-base-item';

@Component({
  selector: 'app-date-item',
  templateUrl: './date-item.component.html',
  styleUrls: ['./date-item.component.css']
})
export class DateItemComponent extends DynamicBaseItem implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {

  }

}
