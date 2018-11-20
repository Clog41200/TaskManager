import { Subscription } from 'rxjs';
import { MessagesService, UserMessage } from './../../app/messages.service';
import { ConnexionService } from './../../app/connexion.service';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Users, UsersService } from 'src/app/users.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'connected-users',
  templateUrl: './connected-users.component.html',
  styleUrls: ['./connected-users.component.css']
})
export class ConnectedUsersComponent implements OnInit, OnDestroy {
  public users: Array<Users>;

  private links: Array<UserMessage>;

  private currentUserChat: number;
  private messagerieSubscription: Subscription;

  constructor(
    private userservices: UsersService,
    private route: Router,
    private messageservice: MessagesService
  ) {
    this.links = [];
    this.currentUserChat = 0;
    this.route.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.currentUserChat = 0;
        if (event.snapshot.url[0].path === 'chat') {
          this.currentUserChat = parseInt(event.snapshot.params.user, 10);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.messagerieSubscription) {
      this.messagerieSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.messageservice.GetMyWaitingMessages().then(result => {
      this.links = result;
    });

    this.messagerieSubscription = this.messageservice.ListenMessage().subscribe(id_link_message => {
      this.messageservice.GetMyWaitingMessages().then(result => {
        if (this.messageservice.ignoreMessageFrom) {
          this.links = result.filter(link => link.id_from !== this.messageservice.ignoreMessageFrom.id);
          this.messageservice.ReadMessageOf(this.messageservice.ignoreMessageFrom.id);
        } else {
          this.links = result;
        }
      });
    });

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

  isCurrentChat(user: Users) {
    return (user.id === this.currentUserChat);
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

  getNotifs(user: Users) {
    return this.links.filter(link => link.id_from === user.id).length;
  }
}
