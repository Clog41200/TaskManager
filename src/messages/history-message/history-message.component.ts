import { Md5 } from 'ts-md5';
import { Message } from './../../app/messages.service';
import {
  Component,
  OnInit,
  Input,
  SecurityContext,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Users } from 'src/app/users.service';

@Component({
  selector: 'history-message',
  templateUrl: './history-message.component.html',
  styleUrls: ['./history-message.component.css'],
  exportAs: 'historyMessage'
})
export class HistoryMessageComponent implements OnInit, OnChanges {
  @Input() messages: Array<Message>;
  @Input() users: Array<Users>;

  public regroupement: Array<{ id_user: number; messages: Array<Message> }>;

  constructor() {
    this.regroupement = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.messages) {
      if (changes.messages.currentValue) {
        this.CalculateRegroupemen(changes.messages.currentValue);
      }
    }
  }

  ngOnInit() {}

  Update() {
    if (this.messages) { this.CalculateRegroupemen(this.messages); }
  }

  CalculateRegroupemen(messages: any) {
    this.regroupement = [];
    let precedent = -1;
    for (const message of messages) {
      if (message.id_user !== precedent) {
        this.regroupement.push({
          id_user: message.id_user,
          messages: [message]
        });
      } else {
        this.regroupement[this.regroupement.length - 1].messages.push(message);
      }
      precedent = message.id_user;
    }
  }

  getUser(id: number): Users {
    const index = this.users.findIndex(user => user.id == id);
    //    console.log(index, this.users, id);
    return this.users[index];
  }

  getAvatar(user: Users) {
    if (user) {
      const email = Md5.hashStr(user.mail.trim().toLowerCase());
      return 'https://www.gravatar.com/avatar/' + email;
    }
    return '';
  }

  getPseudo(userId: number) {
    const index = this.users.findIndex(user => userId === user.id);
    if (index >= 0) {
      return this.users[index].pseudo;
    }
    return '';
  }

  formatDH(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString('fr');
  }
}
