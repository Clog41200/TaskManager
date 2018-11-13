import { PostgresqlService } from './postgresql.service';
import { Injectable } from '@angular/core';
import { Task } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private pg: PostgresqlService) { }

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

  GetAllByTask(task: Task): Promise<Array<Message>> {
    return this.pg.Query(
      // tslint:disable-next-line:max-line-length
      'select messages.* from messages, task_messages where task_messages.id_task=$1 and task_messages.id_message=messages.id order by messages.date_heure asc',
      [task.id]
    );
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
