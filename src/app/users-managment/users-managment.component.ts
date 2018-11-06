import { UsersService, Users } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { config } from 'rxjs';

@Component({
  selector: 'app-users-managment',
  templateUrl: './users-managment.component.html',
  styleUrls: ['./users-managment.component.css']
})
export class UsersManagmentComponent implements OnInit {
  public users: Array<Users>;
  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getall();
  }
  getall() {
    this.usersService.GetAll().then(users => {
      this.users = users;
    });
  }

  delete(user: Users) {
    this.usersService.Delete(user).then(() => {
      this.getall();
    });
  }

  editer(user: Users) {
    const diag = this.dialog.open(UserDialogComponent, { data: user });
    diag.afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getall();
      }
    });

  }

  ajouter() {
    const diag = this.dialog.open(UserDialogComponent, { data: new Users() });
    diag.afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getall();
      }
    });
  }
}
