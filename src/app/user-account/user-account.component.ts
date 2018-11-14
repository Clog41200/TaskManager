import { Users } from './../users.service';
import { UsersService } from 'src/app/users.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  public user: Users;

  constructor(private activeRoute: ActivatedRoute, private userservice: UsersService, private snack: MatSnackBar) {


  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {

      this.userservice.GetById(params.user).then(res => {
        this.user = res[0];
      });
    });
  }

  onSubmit(form: NgForm) {
    if (!form.invalid) {
      this.userservice.UpdateUser(this.user).then(() => {
        this.snack.open('Profil enregistré.', 'Fermer', { duration: 3000, verticalPosition: 'top' });
      });
    } else {
      this.snack.open('Données manquantes.', 'Fermer', { duration: 3000, verticalPosition: 'top' });
    }
  }

}
