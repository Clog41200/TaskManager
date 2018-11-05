import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ElectronService } from 'ngx-electron';
import { PostgresqlService } from '../postgresql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  initform = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  public showError = false;
  public messageErreur = '';

  constructor(
    private elec: ElectronService,
    private pg: PostgresqlService,
    private zone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {
    this.elec.remote.getCurrentWindow().setSize(350, 400);
    this.elec.remote.getCurrentWindow().center();
    this.elec.remote.getCurrentWindow().show();
    this.elec.ipcRenderer.once('connexion_ok', (event, retour) => {
      this.elec.remote.getCurrentWindow().hide();

      localStorage.setItem('user', JSON.stringify(retour));

      this.zone.run(() => {
        this.router.navigate(['main']);
      });
    });
  }

  submit() {
    this.elec.ipcRenderer.once('connexion_erreur', (event, retour) => {
      this.zone.run(() => {
        this.showError = true;
        this.messageErreur = retour;
      });

      setTimeout(() => {
        this.zone.run(() => {
          this.showError = false;
        });
      }, 4000);
    });

    this.elec.ipcRenderer.send('connexion', this.pg.guid(), {
      login: this.initform.value.login,
      password: this.initform.value.password
    });
  }
}
