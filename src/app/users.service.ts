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
      this.electron.ipcRenderer.emit('Users_Add', { uuid: uuid, data: user });
      this.electron.ipcRenderer.once(uuid, retour => {
        this.zone.run(() => {
          resolve(retour);
        });
      });
    });
  }

  GetAll(): Promise<Array<Users>> {
    return new Promise((resolve, reject) => {
      this.electron.ipcRenderer.once('GetUsers', (event, data) => {
        console.log(data);
        resolve(data);
      });
      this.electron.ipcRenderer.send('GetUsers');
    });
  }
}

export class Users {
  public id: 0;
  public mail: '';
  public password: '';
}
