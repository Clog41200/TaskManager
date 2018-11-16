import { ConnexionService } from './../../app/connexion.service';
import { Subscription } from 'rxjs';
import { MessagesService, Message } from './../../app/messages.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  public form = new FormGroup({
    message: new FormControl('')
  });

  public iduser: number;
  public subscription: Subscription;

  public messages: Array<Message>;

  constructor(
    private activeRoute: ActivatedRoute,
    private messageservice: MessagesService,
    private connexionservice: ConnexionService
  ) {
    this.messages = [];
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.iduser = params.user;
      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      this.messageservice.GetAllFromUser(this.iduser).then(res => {
        this.messages = res;

        this.messageservice.ReadMessageOf(this.iduser);

      });

      this.subscription = this.messageservice
        .ListenOnUser(this.iduser)
        .subscribe(idnewmessage => {
          this.messageservice.GetById(idnewmessage).then(message => this.messages.push(message));
        });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    const message = new Message();
    message.id_user = this.connexionservice.user.id;
    message.text = this.form.value.message;
    message.date_heure = (new Date()).getTime();
    this.messageservice.AddMessageToUser(message, this.iduser).then(() => {
      this.form.patchValue({ message: '' });
    });
  }
}
