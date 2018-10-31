import { Injectable } from '@angular/core';
import { PostgresqlService } from './postgresql.service';
import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private pg : PostgresqlService) { }

  AddUser(user : Users): Promise<Users>{
    return new Promise((resolve,reject)=>{
      var uuid = this.pg.guid();
      ipcRenderer.emit('Users_Add',{uuid:uuid,data:user});
      
      ipcRenderer.once(uuid,(retour)=>{
        resolve(retour);
      });
    });
  }

}

export class Users{
  public id:0;
  public email:'';
  public mdp:'';
}
