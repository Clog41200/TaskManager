import { PostgresqlService } from './postgresql.service';
import { Users, UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { Rights, RightsService } from './rights.service';

@Injectable({
  providedIn: 'root'
})
export class UsersRightsService {
  constructor(
    private pg: PostgresqlService,
    private userService: UsersService,
    private rightsService: RightsService
  ) {}

  Add(userRight: UsersRights): Promise<Array<UsersRights>> {
    return this.pg.Query(
      'insert into users_rights ("idRight","idUser") values ($1,$2) returning id',
      [userRight.idRight, userRight.idUser]
    );
  }

  Delete(userRight: UsersRights): Promise<any> {
    return this.pg.Query('delete from users_rights where id = $1', [
      userRight.id
    ]);
  }

  GetAll(): Promise<Array<UsersRights>> {
    return this.pg.Query('select * from users_rights');
  }

  GetByUser(user: Users): Promise<Array<UsersRights>> {
    return this.pg.Query('select * from users_rights where "idUser"=$1', [
      user.id
    ]);
  }
  GetRightsByUser(user: Users): Promise<Array<Rights>> {

    return this.pg.Query(
      'select rights.* from rights, users_rights where users_rights."idUser"=$1 AND rights.id = users_rights."idRight"',
      [user.id]
    );
  }

  Update(right: UsersRights) {
    return this.pg.Query(
      'update users_rights set "idUser"=$1, "idRight"=$2 where id=$3',
      [right.idUser, right.idRight, right.id]
    );
  }

  DeleteRightToUser(right: Rights, user: Users) {
    return this.pg.Query(
      'delete from users_rights where "idUser"=$1 and "idRight"=$2',
      [user.id, right.id]
    );
  }
}

export class UsersRights {
  public id: number;
  public idUser: number;
  public idRight: number;

  constructor() {
    this.id = 0;
    this.idUser = 0;
    this.idRight = 0;
  }
}
