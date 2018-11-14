import { MessagesService } from './messages.service';
import { PostgresqlService } from './postgresql.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskMessageService {
  constructor(
    private pg: PostgresqlService,
    private messageService: MessagesService
  ) {}

  Add(taskmessage: TaskMessage): Promise<TaskMessage> {
    return new Promise((res, rej) => {
      this.pg
        .Query(
          'insert into task_messages (id_task,id_message) values ($1,$2) returning *',
          [taskmessage.id_task, taskmessage.id_message]
        )
        .then(resultat => {
          res(resultat[0]);

          this.pg.Query(
            'NOTIFY newtaskmessage' +
              taskmessage.id_task +
              ', \'' +
              taskmessage.id_message +
              '\''
          );
        });
    });
  }
}

export class TaskMessage {
  public id: number;
  public id_task: number;
  public id_message: number;

  constructor() {
    this.id = 0;
    this.id_task = 0;
    this.id_message = 0;
  }
}
