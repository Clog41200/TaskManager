import { ConnexionService } from './connexion.service';
import { Users } from './users.service';
import { Observable } from 'rxjs';
import { PostgresqlService } from './postgresql.service';
import { Injectable } from '@angular/core';
import { Task } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private pg: PostgresqlService,
    private connexionservice: ConnexionService) { }

  Add(message: Message): Promise<Message> {
    return new Promise((res, rej) => {
      this.pg
        .Query(
          'insert into messages (text,date_heure,id_user) values ($1,$2,$3) returning *',
          [message.text, message.date_heure, message.id_user]
        )
        .then(resultat => {
          res(resultat[0]);
        });
    });
  }

  GetById(id: number): Promise<Message> {
    return new Promise((res, rej) => {
      this.pg
        .Query('select * from messages where id=$1', [id])
        .then(resultat => {
          res(resultat[0]);
        });
    });
  }

  ReadMessageOf(iduser: number) {
    this.pg.Query('update user_messages set vu=true where id_from=$1 and id_to=$2', [iduser, this.connexionservice.user.id]).then(() => {
      this.pg.Query('notify newmessage' + this.connexionservice.user.id + ', \' \'').then(() => {
      });
    });
  }

  GetAllFromUser(iduser: number) {
    return this.pg.Query(
      // tslint:disable-next-line:max-line-length
      'select messages.* from messages, user_messages where ((user_messages.id_to=$1 and user_messages.id_from=$2) OR (user_messages.id_to=$2 and user_messages.id_from=$1)) and user_messages.id_message=messages.id order by messages.date_heure asc', [
        this.connexionservice.user.id, iduser
      ]);
  }

  GetAllByTask(task: Task): Promise<Array<Message>> {
    return this.pg.Query(
      // tslint:disable-next-line:max-line-length
      'select messages.* from messages, task_messages where task_messages.id_task=$1 and task_messages.id_message=messages.id order by messages.date_heure asc',
      [task.id]
    );
  }

  DeleteByTask(task: Task) {
    this.pg
      .Query('select * from task_messages where id_task=$1', [task.id])
      .then(res => {
        for (const lien of res) {
          this.pg.Query('delete from messages where id=$1', [lien.id_message]);
        }
      });
    this.pg.Query('delete from task_messages where id_task=$1', [task.id]);
  }

  ListenOnTask(task: Task): Observable<number> {
    return this.pg.Listen('newtaskmessage' + task.id);
  }

  ListenMessage(): Observable<number> {
    return this.pg.Listen('newmessage' + this.connexionservice.user.id);
  }

  ListenOnUser(id_user: number): Observable<number> {
    return this.pg.Listen('newmessagefrom' + id_user + 'to' + this.connexionservice.user.id);
  }

  GetUserMessageById(id: number): Promise<UserMessage> {
    return new Promise((res, rej) => {
      this.pg.Query('select * from user_messages where id=$1', [id]).then(result => {
        if (result.length > 0) res(result[0]);
        else res(undefined);
      });
    });
  }

  GetMyWaitingMessages(): Promise<Array<UserMessage>> {
    return this.pg.Query('select * from user_messages where id_to=$1 and vu=false', [this.connexionservice.user.id]);
  }

  AddMessageToUser(message: Message, user: number): Promise<void> {
    return new Promise((res, rej) => {
      this.Add(message).then((result) => {
        this.pg.Query('insert into user_messages (id_from,id_to,id_message) VALUES ($1,$2,$3) returning *', [
          this.connexionservice.user.id, user, result.id
        ]).then((usemess) => {
          this.pg.Query('notify newmessagefrom' + user + 'to' + this.connexionservice.user.id + ', \'' + result.id + '\'');
          this.pg.Query('notify newmessagefrom' + this.connexionservice.user.id + 'to' + user + ', \'' + result.id + '\'');
          this.pg.Query('notify newmessage' + user + ', \'' + usemess[0].id + '\'');
          res();
        });
      });
    });
  }
}

export class Message {
  public id: number;
  public text: string;
  public date_heure: number;
  public id_user: number;

  constructor() {
    this.id = 0;
    this.text = '';
    this.date_heure = new Date().getTime();
    this.id_user = 0;
  }
}

export class UserMessage {
  public id: number;
  public id_to: number;
  public id_from: number;
  public id_message: number;
  public vu: boolean;

  constructor() {
    this.id = 0;
    this.id_to = 0;
    this.id_from = 0;
    this.id_message = 0;
    this.vu = false;
  }
}

