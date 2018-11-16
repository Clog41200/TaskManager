import { Subscription } from 'rxjs';
import { MessagesService } from './../../app/messages.service';
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

  constructor(
    private activeRoute: ActivatedRoute,
    private messageservice: MessagesService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.iduser = params.user;
      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      this.subscription = this.messageservice
        .ListenOnUser(this.iduser)
        .subscribe(idnewmessage => {});
    });
  }

  ngOnDestroy() {}

  onSubmit() {}
}
