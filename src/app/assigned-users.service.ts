import { Injectable } from '@angular/core';
import { PostgresqlService } from './postgresql.service';
import { UserRightsDialogComponent } from './user-rights-dialog/user-rights-dialog.component';
import { Users } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AssignedUsersService {
  constructor(private pg: PostgresqlService) {}

  GetByTask(id_task: number): Promise<Array<AssignedUser>> {
    return this.pg.Query('select * from assigned_users where id_task=$1', [
      id_task
    ]);
  }

  Add(assignedUser: AssignedUser) {
    return this.pg.Query(
      'insert into assigned_users (id_user,id_task) values ($1,$2) returning *',
      [assignedUser.id_user, assignedUser.id_task]
    );
  }

  Update(assignedUser: AssignedUser) {
    return this.pg.Query('update assigned_users set id_user=$1 where id=$2', [
      assignedUser.id_user,
      assignedUser.id
    ]);
  }
}

export class AssignedUser {
  public id: number;
  public id_task: number;
  public id_user: number;
  public vu: boolean;

  constructor() {
    this.id = 0;
    this.id_task = 0;
    this.id_user = 0;
    this.vu = false;
  }
}
