import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private elec: ElectronService) { }

  ngOnInit() {
    this.elec.remote.getCurrentWindow().maximize();
    this.elec.remote.getCurrentWindow().show();
  }

}
