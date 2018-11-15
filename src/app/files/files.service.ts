import { Injectable } from '@angular/core';
import { PostgresqlService } from '../postgresql.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private pg: PostgresqlService) { }

  Add(file: File): Promise<number> {
    return new Promise((res, rej) => {
      this.pg
        .Query('insert into files (filename,data) VALUES ($1,$2) returning id', [
          file.filename,
          file.data
        ])
        .then(result => {
          res(result[0].id);
        });
    });
  }

  GetById(id: number): Promise<File> {
    return new Promise((res, rej) => {
      this.pg.Query('select * from files where id=$1', [id]).then(result => {
        if (result.length > 0) {
          res(result[0]);
        } else {
          res(undefined);
        }
      });
    });
  }

  GetAllWithoutData(): Promise<Array<File>> {
    return this.pg.Query('select id, filename from files');
  }

  open(file: File) {
    this.pg.Query('select data from files where id=$1', [file.id]).then(res => {
      const base64 = new TextDecoder('utf-8').decode(res[0].data);
      const a = document.createElement('a');
      a.download = file.filename;
      a.href = base64;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  Delete(file: File): Promise<void> {
    return this.pg.Query('delete from files where id=$1', [file.id]);
  }
}

export class File {
  public id: number;
  public filename: string;
  public data: any;

  constructor() {
    this.id = 0;
    this.filename = '';
  }
}
