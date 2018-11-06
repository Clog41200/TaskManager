import { Injectable } from '@angular/core';
import { PostgresqlService } from './postgresql.service';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class RightsService {
  constructor(private pg: PostgresqlService) {}

  Add(right: Rights): Promise<Array<Rights>> {
    return this.pg.Query(
      'insert into rights (label) values ($1) returning id',
      [right.label]
    );
  }

  Delete(right: Rights): Promise<any> {
    return this.pg.Query('delete from rights where id = $1', [right.id]);
  }

  GetAll(): Promise<Array<Rights>> {
    return this.pg.Query('select * from rights');
  }

  Update(right: Rights) {
    return this.pg.Query('update rights set label=$1 where id=$2', [
      right.label,
      right.id
    ]);
  }
}

export class Rights {
  public id: number;
  public label: string;
  constructor() {
    this.id = 0;
    this.label = '';
  }
}
