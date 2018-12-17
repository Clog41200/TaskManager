import { Injectable } from '@angular/core';
import { PostgresqlService } from './postgresql.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(private pg: PostgresqlService) {}

  GetAll(): Promise<Array<Item>> {
    return this.pg.Query('select * from task_items order by ordre asc');
  }

  Add(item: Item): Promise<number> {
    return new Promise((res, rej) => {
      this.pg.Query('select count(*) as nb from task_items').then(result => {
        item.ordre = result[0].nb;
        this.pg
          .Query(
            'insert into task_items (label,type,options,ordre,est_tag) VALUES ($1,$2,$3,$4,$5) returning id',
            [item.label, item.type, item.options, item.ordre, item.est_tag]
          )
          .then(resultat => {
            res(resultat[0].id);
          });
      });
    });
  }

  Update(item: Item): Promise<void> {
    return this.pg.Query(
      'update task_items set label=$1, type=$2, options=$3, ordre=$4, est_tag=$6 where id=$5',
      [item.label, item.type, item.options, item.ordre, item.id, item.est_tag]
    );
  }

  Delete(item: Item): Promise<void> {
    return this.pg.Query('delete from task_items where id=$1', [item.id]);
  }
}

export class Item {
  public id: number;
  public type: string;
  public options: string;
  public ordre: number;
  public label: string;
  public est_tag: boolean;
  public value: any;
  public colors: Array<any>;
  constructor() {
    this.id = 0;
    this.type = '';
    this.options = '';
    this.ordre = 0;
    this.label = '';
    this.est_tag = false;
    this.colors = new Array<any>();
  }
}
