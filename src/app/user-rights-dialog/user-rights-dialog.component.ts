import { RightsService } from './../rights.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { UsersRights, UsersRightsService } from '../users-rights.service';
import { Users } from '../users.service';
import { Rights } from '../rights.service';

@Component({
  selector: 'app-user-rights-dialog',
  templateUrl: './user-rights-dialog.component.html',
  styleUrls: ['./user-rights-dialog.component.css']
})
export class UserRightsDialogComponent implements OnInit {
  public rights: Array<Rights>;
  public aajouter: any;

  public allrights: Array<Rights>;

  constructor(
    public dialogRef: MatDialogRef<UserRightsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: Users,
    private usersRightsService: UsersRightsService,
    private rightsService: RightsService
  ) {
    this.rightsService.GetAll().then(res => {
      this.allrights = res;
    });
  }

  ngOnInit() {
    this.usersRightsService.GetRightsByUser(this.user).then(res => {
      this.rights = res;
    });
  }

  delete(right: Rights) {
    this.usersRightsService.DeleteRightToUser(right, this.user).then(() => {
      this.ngOnInit();
    });
  }

  ajouter() {
    const index = this.rights.findIndex(right => {
      if (right.id === this.aajouter.id) {
        return true;
      }
      return false;
    });
    if (index === -1) {
      const link = new UsersRights();
      link.idRight = this.aajouter.id;
      link.idUser = this.user.id;
      this.usersRightsService.Add(link).then(() => {
        this.ngOnInit();
      });
      this.aajouter = null;
    } else {
      alert('Vous ne pouvez pas ajouter deux fois le même droit utilisateur');
    }
  }
}
