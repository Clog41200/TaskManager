import { Injectable } from '@angular/core';
import { PostgresqlService } from '../postgresql.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private pg: PostgresqlService) {}

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
