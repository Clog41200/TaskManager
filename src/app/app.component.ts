import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';

import { ConnexionService } from './connexion.service';
import { UsersRightsService } from './users-rights.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taskManager';

  public showMenu = false;
  public showMenuButton = false;

  constructor(
    private electron: ElectronService,
    public router: Router,
    private userrightservice: UsersRightsService,
    public connexionService: ConnexionService
  ) {}

  isAdmin() {
    const index = this.connexionService.rights.findIndex(droit => {
      return droit.label === 'Administrateur';
    });
    return index !== -1;
  }

  toggleMaximize() {
    if (this.electron.remote.getCurrentWindow().isMaximized()) {
      this.electron.remote.getCurrentWindow().restore();
    } else {
      this.electron.remote.getCurrentWindow().maximize();
    }
  }

  close() {
    this.connexionService.Deconnexion().then(() => {
      window.close();
    });
  }
}
