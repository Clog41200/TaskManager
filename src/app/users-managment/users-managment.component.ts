import { UsersService, Users } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-users-managment',
  templateUrl: './users-managment.component.html',
  styleUrls: ['./users-managment.component.css']
})
export class UsersManagmentComponent implements OnInit {
  public users: Array<Users>;
  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  ngOnInit() {
    this.usersService.GetAll().then(users => {
      this.users = users;
    });
  }

  ajouter() {
    this.dialog.open(UserDialogComponent);
  }
}
