import { Component, OnInit } from '@angular/core';
import { DynamicBaseItem } from '../dynamic-base-item';
import { Users, UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.css']
})
export class UsersItemComponent extends DynamicBaseItem implements OnInit {
  public values: Array<Users>;

  constructor(private userService: UsersService) {
    super();
  }

  ngOnInit() {
    this.userService.GetAll().then(res => {
      this.values = res;
    });
  }

  testSelect(o1, o2) {

    return o1 == o2;
  }

}
