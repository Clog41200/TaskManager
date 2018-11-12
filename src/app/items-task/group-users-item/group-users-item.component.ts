import { Component, OnInit } from '@angular/core';
import { DynamicBaseItem } from '../dynamic-base-item';

@Component({
  selector: 'app-group-users-item',
  templateUrl: './group-users-item.component.html',
  styleUrls: ['./group-users-item.component.css']
})
export class GroupUsersItemComponent extends DynamicBaseItem implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
