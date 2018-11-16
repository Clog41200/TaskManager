import { ElectronService } from 'ngx-electron';
import { Injectable, NgZone } from '@angular/core';
import { PostgresqlService } from './postgresql.service';

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
    return this.pg.Query(
      'insert into users (mail,password,pseudo) VALUES ($1,$2,$3)',
      [user.mail, user.password, user.pseudo]
    );
  }

  UpdateUser(user: Users): Promise<void> {
    return this.pg.Query(
      'update users SET mail=$1, password=$2, pseudo=$3 where id=$4',
      [user.mail, user.password, user.pseudo, user.id]
    );
  }

  Delete(user: Users): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pg
        .Query('DELETE from users_rights where "idUser"=$1', [user.id])
        .then();

      this.electron.ipcRenderer.once('deleted_user', () => {
        this.zone.run(() => {
          resolve();
        });
      });
      this.electron.ipcRenderer.send('Delete_User', user);
    });
  }

  GetAll(): Promise<Array<Users>> {
    return this.pg.Query('select * from users');
  }

  GetById(id: number): Promise<Users> {
    return new Promise((res, rej) => {
      this.pg.Query('SELECT * FROM users where id=$1', [id]).then(resultat => {
        if (resultat.length > 0) {
          res(resultat[0]);
        } else {
          res(undefined);
        }
      });
    });
  }

  GetConnected(): Promise<Array<Users>> {
    return this.pg.Query('select * from users where est_connecte=true');
  }

  ListenConnected() {
    return this.pg.Listen('userconnexions');
  }
}

export class Users {
  public id: number;
  public mail: string;
  public password: string;
  public pseudo: string;
  public avatar: Uint8Array;
  public est_connecte: boolean;

  constructor() {
    this.id = 0;
    this.mail = '';
    this.password = '';
    this.pseudo = '';
    this.est_connecte = false;
  }
}
