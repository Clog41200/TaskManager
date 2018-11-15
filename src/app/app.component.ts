import { Users } from 'src/app/users.service';
import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Router } from '@angular/router';
import { Rights } from './rights.service';
import { UsersRightsService } from './users-rights.service';
import { ConnexionService } from './connexion.service';

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
    private router: Router,
    private userrightservice: UsersRightsService,
    private connexionService: ConnexionService
  ) {

  }

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

    console.log(this.electron.remote.getCurrentWindow().isMaximized());
  }
}
