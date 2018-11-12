import { PostgresqlService } from './postgresql.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskItemValueService {
  constructor(private pg: PostgresqlService) {}

  Add(task: number, item: number, valeur: any) {
    this.pg.Query(
      'insert into task_items_value (id_task,id_item,valeur) VALUES ($1,$2,$3)',
      [task, item, valeur]
    );
  }

  Update(task: number, item: number, valeur: any) {
    this.pg
      .Query('select * from task_items_value where id_task=$1 and id_item=$2', [
        task,
        item
      ])
      .then(res => {
        if (res.length > 0) {
          this.pg.Query(
            'update task_items_value set valeur=$1 where id_task=$2 and id_item=$3',
            [valeur, task, item]
          );
        } else {
          this.Add(task, item, valeur);
        }
      });
  }

  GetValue(task: number, item: number) {
    return this.pg.Query(
      'select * from task_items_value where id_task=$1 and id_item=$2',
      [task, item]
    );
  }
}

export class TaskItemValue {
  public id: number;
  public id_task: number;
  public id_item: number;
  public valeur: any;

  constructor() {
    this.id = 0;
    this.id_task = 0;
    this.id_item = 0;
    this.valeur = undefined;
  }
}
