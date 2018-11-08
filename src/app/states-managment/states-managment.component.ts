import { MatDialog } from '@angular/material';
import { EtatsService, Etat } from './../etats.service';
import { Component, OnInit } from '@angular/core';
import { EtatDialogComponent } from '../etat-dialog/etat-dialog.component';

@Component({
  selector: 'app-states-managment',
  templateUrl: './states-managment.component.html',
  styleUrls: ['./states-managment.component.css']
})


export class StatesManagmentComponent implements OnInit {
  public states: Array<Etat>;

  constructor(
    private etatService: EtatsService,
    private dgService: MatDialog
  ) {}

  ngOnInit() {
    this.etatService.GetAll().then(res => {
      this.states = res;
    });
  }


  ajouter() {
    const dialog = this.dgService.open(EtatDialogComponent, {
      data: new Etat()
    });
    dialog.afterClosed().subscribe(res => {
      if (res === 'update') {
        this.ngOnInit();
      }
    });
  }

  delete(etat: Etat) {
    this.etatService.Delete(etat).then(() => {
      this.ngOnInit();
    });
  }

  edit(etat: Etat) {
    const dialog = this.dgService.open(EtatDialogComponent, { data: etat });
    dialog.afterClosed().subscribe(res => {
      if (res === 'update') {
        this.ngOnInit();
      }
    });
  }

  moveup(etat: Etat) {
    const index = this.states.indexOf(etat);
    if (index > 0) {
      const objavant = this.states[index - 1];
      objavant.ordre++;
      etat.ordre--;
      this.etatService.Update(objavant).then(() => {
        this.etatService.Update(etat).then(() => {
          this.ngOnInit();
        });
      });
    }
  }

  movedown(etat: Etat) {
    const index = this.states.indexOf(etat);
    if (index < this.states.length - 1) {
      const objavant = this.states[index + 1];
      objavant.ordre--;
      etat.ordre++;
      this.etatService.Update(objavant).then(() => {
        this.etatService.Update(etat).then(() => {
          this.ngOnInit();
        });
      });
    }
  }
}
