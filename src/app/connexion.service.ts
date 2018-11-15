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
    if (!test) {
      this.user = new Users();
      this.rights = [];
    } else {
      this.user = JSON.parse(test);
      this.GetRights();
    }
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

  Connexion(login: string, mdp: string): Promise<Users> {
    return new Promise((res, rej) => {
      this.pg
        .Query('select * from users where mail=$1 and password=$2', [
          login,
          mdp
        ])
        .then(resultat => {
          if (resultat.length > 0) {
            res(resultat[0]);
          } else {
            res(undefined);
          }
        });
    });
  }
}
