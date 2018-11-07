import { RightsDialogComponent } from './../rights-dialog/rights-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Rights, RightsService } from '../rights.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-rights-managment',
  templateUrl: './rights-managment.component.html',
  styleUrls: ['./rights-managment.component.css']
})
export class RightsManagmentComponent implements OnInit {
  public rights: Array<Rights>;

  constructor(
    private rightsService: RightsService,
    private dialogService: MatDialog
  ) {}

  ngOnInit() {
    this.rightsService.GetAll().then(res => {
      this.rights = res;
    });
  }

  ajouter() {
    const dialog = this.dialogService.open(RightsDialogComponent, {
      data: new Rights()
    });
    dialog.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.ngOnInit();
      }
    });
  }

  delete(user) {
    this.rightsService.Delete(user).then(() => {
      this.ngOnInit();
    });
  }

  edit(user) {
    const dialog = this.dialogService.open(RightsDialogComponent, {
      data: user
    });
    dialog.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.ngOnInit();
      }
    });
  }
}
