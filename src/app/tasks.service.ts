import { Injectable } from '@angular/core';
import { PostgresqlService } from './postgresql.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private pg: PostgresqlService) {}
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
