import { Injectable } from '@angular/core';
import { PostgresqlService } from './postgresql.service';
import { Etat } from './etats.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private pg: PostgresqlService) {}

  Add(task: Task) {
    task.dh_creation = new Date().getTime();
    return this.pg.Query(
      'insert into tasks (title,description,id_etat,dh_creation) VALUES ($1,$2,$3,$4) returning *',
      [task.title, task.description, task.id_etat, task.dh_creation]
    );
  }

  Update(task: Task) {
    return this.pg.Query(
      'update tasks SET title=$1, description=$2, id_etat=$3 where id=$4',
      [task.title, task.description, task.id_etat, task.id]
    );
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
