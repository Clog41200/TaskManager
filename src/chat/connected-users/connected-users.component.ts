import { ConnexionService } from './../../app/connexion.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Users, UsersService } from 'src/app/users.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'connected-users',
  templateUrl: './connected-users.component.html',
  styleUrls: ['./connected-users.component.css']
})
export class ConnectedUsersComponent implements OnInit {
  protected users: Array<Users>;

  constructor(
    private userservices: UsersService,
    private route: Router,
    private connexionservice: ConnexionService
  ) {}

  ngOnInit() {
    this.userservices.GetConnected().then(res => {
      this.users = res;
      console.log(this.users);
    });

    this.userservices.ListenConnected().subscribe(userid => {
      this.userservices.GetById(userid).then(user => {
        const index = this.users.findIndex(usertab => {
          return usertab.id === user.id;
        });
        if (index === -1 && user.est_connecte) {
          this.users.push(user);
        } else {
          if (index !== -1) {
            this.users.splice(index, 1);
          }
        }
      });
    });
  }

  getAvatar(user: Users) {
    const email = Md5.hashStr(user.mail.trim().toLowerCase());
    return 'https://www.gravatar.com/avatar/' + email;
  }

  ouvrirChat(user: Users) {
    //if (this.connexionservice.user.id !== user.id) {
      this.route.navigate(['/chat', user.id]);
    //}
  }
}
