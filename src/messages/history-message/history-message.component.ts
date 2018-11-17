import { Message } from './../../app/messages.service';
import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { Users } from 'src/app/users.service';

@Component({
  selector: 'history-message',
  templateUrl: './history-message.component.html',
  styleUrls: ['./history-message.component.css']
})
export class HistoryMessageComponent implements OnInit {

  @Input() messages: Array<Message>;
  @Input() users: Array<Users>;

  constructor() {

   }

  ngOnInit() {

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
