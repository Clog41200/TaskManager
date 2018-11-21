import { Notification } from './../notifications.service';
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'notification-listing',
  templateUrl: './notification-listing.component.html',
  styleUrls: ['./notification-listing.component.css'],
  exportAs: 'notificationListing',
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        maxHeight: '500px',
        overflow: 'auto'
      })),
      state('closed', style({
        opacity: 0,
        maxHeight: '0px',
        overflow: 'hidden'
      })),
      transition('open => closed', [animate('0.5s ease-out')]),
      transition('closed => open', [animate('0.5s ease-in')]),
    ])
  ]
})
export class NotificationListingComponent implements OnInit {

  public isopen: boolean;
  @Input() public notifications: Array<Notification>;

  constructor() {
    this.isopen = false;
  }

  ngOnInit() {
  }

  actionNotification(notif: Notification) {

  }

  closeNotification(notif: Notification) {

  }

  clearAll() {
    this.isopen = false;
  }

  toggle() {
    this.isopen = !this.isopen;
  }

}
