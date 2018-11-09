import { FormGroup, FormControl } from '@angular/forms';
import { EtatsService } from './../etats.service';
import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Users } from '../users.service';
import { Etat } from '../etats.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public etats: Array<Etat>;
  public currentUser: Users;

  public form = new FormGroup({
    keywork: new FormControl('')
  });

  constructor(
    private elec: ElectronService,
    public etatService: EtatsService
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.elec.remote.getCurrentWindow().maximize();
    this.elec.remote.getCurrentWindow().show();
    this.etatService.GetAll().then(res => {
      this.etats = res;
    });
  }
}
