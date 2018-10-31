import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostgresqlService } from '../postgresql.service';
import { ipcRenderer } from 'electron';


@Component({
  selector: 'app-init-app',
  templateUrl: './init-app.component.html',
  styleUrls: ['./init-app.component.css']
})
export class InitAppComponent implements OnInit {

  initform = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private elec: ElectronService, private pg: PostgresqlService) { }

  ngOnInit() {
    this.elec.remote.getCurrentWindow().setSize(350, 400);
    this.elec.remote.getCurrentWindow().center();
    this.elec.remote.getCurrentWindow().show();
  }

  submit() {
    this.elec.ipcRenderer.send('initialisation',this.pg.guid() , {
      login: this.initform.value.login,
      password: this.initform.value.password
    });
  }

}
