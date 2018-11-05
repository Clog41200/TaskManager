import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taskManager';

  public showMenu = false;
  public showMenuButton = false;

  constructor(private electron: ElectronService, private router: Router) {}

  toggleMaximize() {
    if (this.electron.remote.getCurrentWindow().isMaximized()) {
      this.electron.remote.getCurrentWindow().restore();
    }
    else { this.electron.remote.getCurrentWindow().maximize(); }

    console.log(this.electron.remote.getCurrentWindow().isMaximized());
  }
}
