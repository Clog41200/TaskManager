import { ElectronService } from 'ngx-electron';
import { Injectable, NgZone } from '@angular/core';
import { PostgresqlService } from './postgresql.service';
import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private electron: ElectronService,
    private pg: PostgresqlService,
    private zone: NgZone
  ) {}

  AddUser(user: Users): Promise<Users> {
    return new Promise((resolve, reject) => {
      const uuid = this.pg.guid();
      console.log('Ajout d\'un utilisateur');
      this.electron.ipcRenderer.send('Users_Add', { uuid: uuid, data: user });
      this.electron.ipcRenderer.once(uuid, (event, retour) => {
        this.zone.run(() => {
          resolve(retour);
        });
      });
    });
  }

  UpdateUser(user: Users): Promise<void> {
    return new Promise((resolve, reject) => {
      this.electron.ipcRenderer.send('Users_Update', user);
      this.electron.ipcRenderer.once('Users_updated', (event, res) => {
        this.zone.run(() => {
          resolve(res);
        });
      });
    });
  }

  Delete(user: Users): Promise<void> {
    return new Promise((resolve, reject) => {
      this.electron.ipcRenderer.once('deleted_user', () => {
        this.zone.run(() => {
          resolve();
        });
      });
      this.electron.ipcRenderer.send('Delete_User', user);
    });
  }

  GetAll(): Promise<Array<Users>> {
    return new Promise((resolve, reject) => {
      this.electron.ipcRenderer.once('GetUsers', (event, data) => {
        resolve(data);
      });
      this.electron.ipcRenderer.send('GetUsers');
    });
  }
}

export class Users {
  public id: Number;
  public mail: String;
  public password: String;

  constructor() {
    this.id = 0;
    this.mail = '';
    this.password = '';
  }
}
