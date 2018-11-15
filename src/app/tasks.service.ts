import { MatDialog } from '@angular/material';
import { MessagesService } from './messages.service';
import { Observable } from 'rxjs';
import { Injectable, ComponentRef, TemplateRef } from '@angular/core';
import { PostgresqlService } from './postgresql.service';
import { Etat } from './etats.service';
import { ComponentType } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(
    private pg: PostgresqlService,
    private messageService: MessagesService,
    private dialog: MatDialog
  ) {}

  GetById(id: number): Promise<Task> {
    return new Promise((res, rej) => {
      this.pg.Query('SELECT * FROM tasks where id =$1', [id]).then(resultat => {
        if (resultat.length > 0) {
          res(resultat[0]);
        } else {
          res(undefined);
        }
      });
    });
  }

  Add(task: Task): Promise<Task> {
    task.dh_creation = new Date().getTime();
    return new Promise((res, rej) => {
      this.pg
        .Query(
          'insert into tasks (title,description,id_etat,dh_creation) VALUES ($1,$2,$3,$4) returning *',
          [task.title, task.description, task.id_etat, task.dh_creation]
        )
        .then(resultat => {
          res(resultat[0]);
          this.pg.Query('NOTIFY nouvelletache, \'' + resultat[0].id + '\'');
        });
    });
  }

  Delete(task: Task): Promise<void> {
    this.pg.Query('delete from assigned_users where id_task=$1', [task.id]);
    this.pg.Query('delete from task_items_value where id_task=$1', [task.id]);
    this.messageService.DeleteByTask(task);
    return new Promise(res => {
      this.pg.Query('delete from tasks where id=$1', [task.id]).then(() => {
        this.pg.Query('NOTIFY deletedtache, \'' + task.id + '\'');
        res();
      });
    });
  }

  Update(task: Task): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pg
        .Query(
          'update tasks SET title=$1, description=$2, id_etat=$3 where id=$4',
          [task.title, task.description, task.id_etat, task.id]
        )
        .then(() => {
          this.pg.Query('NOTIFY updatedtache, \'' + task.id + '\'');
          resolve();
        });
    });
  }

  OnUpdated(): Observable<number> {
    return this.pg.Listen('updatedtache');
  }

  OnNew(): Observable<number> {
    return this.pg.Listen('nouvelletache');
  }

  OnDeleted(): Observable<number> {
    return this.pg.Listen('deletedtache');
  }

  GetAll(states: Array<Etat>): Promise<Array<Task>> {
    let requete = 'select * from tasks ';
    const tableau = [];
    if (states.length > 0) {
      requete += 'where ';

      for (let i = 0; i < states.length; i++) {
        if (i > 0) {
          requete += ' OR ';
        }
        requete += 'id_etat = $' + (i + 1);
        tableau.push(states[i].id);
      }
    }
    return this.pg.Query(requete, tableau);
  }

  EditTask(id: number, dialog: any, message = false) {
    this.GetById(id).then(tache => {
      if (tache) {
        this.dialog.open(dialog, {
          data: { tache: tache, page: message ? 1 : 0 }
        });
      } else {
        alert('Cette tâche n\'existe plus.');
      }
    });
  }
}

export class Task {
  public id: number;
  public title: string;
  public id_etat: number;
  public dh_creation: number;
  public description: string;

  constructor() {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.id_etat = 0;
    this.dh_creation = 0;
  }
}
