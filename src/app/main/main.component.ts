import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Users } from '../users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public currentUser: Users;

  constructor(private elec: ElectronService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.elec.remote.getCurrentWindow().maximize();
    this.elec.remote.getCurrentWindow().show();
  }

}
