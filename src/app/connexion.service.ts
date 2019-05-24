import { Rights } from './rights.service';
import { Injectable } from '@angular/core';
import { Users } from './users.service';
import { PostgresqlService } from './postgresql.service';
import { UsersRightsService } from './users-rights.service';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  public user: Users;
  public rights: Array<Rights>;

  constructor(
    private pg: PostgresqlService,
    private userrights: UsersRightsService
  ) {
    const test = localStorage.getItem('user');
    this.rights = [];
    if (!test) {
      this.user = new Users();
    } else {
      this.user = JSON.parse(test);
      this.GetRights();
    }

    window.onunload = () => {
      this.pg.ws.send(JSON.stringify({
        type:'deconnexion',
        iduser:this.user.id
      }));
    };
  }

  IsConnected() {
    if (this.user.id !== 0) {
      return true;
    }
    return false;
  }

  GetRights() {
    this.userrights.GetRightsByUser(this.user).then(res => (this.rights = res));
  }

  Deconnexion(): Promise<void> {
    return new Promise((res, rej) => {
      this.pg
        .Query('update users set est_connecte=false where id=$1', [
          this.user.id
        ])
        .then(() => {
          this.pg.Query('notify userconnexions, \'' + this.user.id + '\'');
          this.user = new Users();
          localStorage.removeItem('user');
          res();
        });
    });
  }

  Connexion(login: string, mdp: string): Promise<Users> {
    return new Promise((res, rej) => {
      this.pg
        .Query('select * from users where mail=$1 and password=$2', [
          login,
          mdp
        ])
        .then(resultat => {
          if (resultat.length > 0) {
            this.pg
              .Query('update users set est_connecte=true where id=$1', [
                resultat[0].id
              ])
              .then(() => {
                this.pg.Query(
                  'notify userconnexions, \'' + resultat[0].id + '\''
                );
                resultat[0].est_connecte = true;
                res(resultat[0]);
              });
          } else {
            res(undefined);
          }
        });
    });
  }
}
