import { ConnexionService } from './../connexion.service';
import { PostgresqlService } from './../postgresql.service';
import { Injectable } from '@angular/core';
import { Users } from '../users.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private pg: PostgresqlService, private connexionService:ConnexionService) {}

  GetAllByUser(user: Users) {
    return this.pg.Query('select * from notifications where vu=false and id_user=$1', [
      this.connexionService.user.id
    ]);
  }

  GetByUser(user: Users) {
    return this.pg.Query('select * from notifications where vu=false and id_user=$1', [
      this.connexionService.user.id
    ]);
  }

  GetById(id: number): Promise<Notification> {
    return new Promise((res, rej) => {
      this.pg
        .Query('select * from notifications where id=$1', [id])
        .then(resultat => {
          if (resultat.length > 0) {
            res(resultat[0]);
          } else {
            res(undefined);
          }
        });
    });
  }

  GetCount(id_user: number): Promise<number> {
    return new Promise((res, rej) => {
      this.pg
        .Query('select count(*) as nb from notifications where id_user=$1', [
          id_user
        ])
        .then(retour => {
          res(retour[0].nb);
        });
    });
  }

  AddNotification(notification: Notification): Promise<Notification> {
    return new Promise((res, rej) => {
      this.pg
        .Query(
          'insert into notifications (id_user,text,data,vu) VALUES ($1,$2,$3,$4) returning *',
          [
            notification.id_user,
            notification.text,
            notification.data,
            notification.vu
          ]
        )
        .then(resultat => {
          this.pg.Query(
            'NOTIFY newnotification' +
              notification.id_user +
              ', \'' +
              resultat[0].id +
              '\''
          );
          res(resultat[0]);
        });
    });
  }

  ClearAll(user: Users) {
    return this.pg.Query('update notifications set vu=true where id_user=$1', [
      user.id
    ]);
  }

  OnNewNotification(id_user: number) {
    return this.pg.Listen('newnotification' + id_user);
  }
}

export class Notification {
  public id: number;
  public id_user: number;
  public text: string;
  public data: any;
  public vu: boolean;
  constructor() {
    this.id = 0;
    this.id_user = 0;
    this.text = '';
    this.data = {};
    this.vu = false;
  }
}
