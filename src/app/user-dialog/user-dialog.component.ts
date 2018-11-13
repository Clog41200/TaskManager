import { Users, UsersService } from './../users.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  public form = new FormGroup({
    pseudo: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users,
    public usersService: UsersService
  ) {
  }

  ngOnInit() {
    if (this.data !== undefined) {
      this.form.patchValue(this.data);
    }
  }

  onSubmit() {

    // ajout si l'id est à 0 sinon update.
    if (this.data.id === 0) {
      this.usersService
        .AddUser({
          id: 0,
          mail: this.form.value.mail,
          password: this.form.value.password,
          pseudo: this.form.value.pseudo
        })
        .then(() => {
          this.dialogRef.close('update');
        });
    } else {
      this.usersService
        .UpdateUser({
          id: this.data.id,
          mail: this.form.value.mail,
          password: this.form.value.password,
          pseudo: this.form.value.pseudo
        })
        .then(() => {
          this.dialogRef.close('update');
        });
    }
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
