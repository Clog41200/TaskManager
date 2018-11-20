import { Injectable } from '@angular/core';
import { PostgresqlService } from './postgresql.service';
import { UML } from 'src/umltool/umlmodels';

@Injectable({
  providedIn: 'root'
})
export class DiagrammesService {
  constructor(private pg: PostgresqlService) {}

  GetByTaskId(id: number): Promise<any> {
    return new Promise((res, rej) => {
      this.pg
        .Query('select * from diagrammes where id_task=$1', [id])
        .then(result => {
          console.log(result);
          if (result.length > 0) {
            res(result[0]);
          } else {
            res(undefined);
          }
        });
    });
  }

  SaveUMLForTask(uml: UML, id_task: number) {
    return new Promise((res, rej) => {
      this.pg
        .Query('select id from diagrammes where id_task=$1', [id_task])
        .then(combien => {
          if (combien[0].length === 0) {
            this.pg
              .Query(
                'insert into diagrammes (id_task,contenu) VALUES ($1,$2) returning *',
                [id_task, uml]
              )
              .then(fin => {
                res(fin[0]);
              });
          } else {
            this.pg
              .Query('update diagrammes set contenu=$1 where id=$2', [
                uml,
                combien[0].id
              ])
              .then(fin => {
                res();
              });
          }
        });
    });
  }
}
