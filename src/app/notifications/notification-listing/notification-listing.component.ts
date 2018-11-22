import { ConnexionService } from './../../connexion.service';
import { TacheDialogComponent } from './../../tache-dialog/tache-dialog.component';
import { Notification, NotificationsService } from './../notifications.service';
import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { TasksService } from 'src/app/tasks.service';

@Component({
  selector: 'notification-listing',
  templateUrl: './notification-listing.component.html',
  styleUrls: ['./notification-listing.component.css'],
  exportAs: 'notificationListing',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          maxHeight: '500px',
          overflow: 'auto'
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          maxHeight: '0px',
          overflow: 'hidden'
        })
      ),
      transition('open => closed', [animate('0.5s ease-out')]),
      transition('closed => open', [animate('0.5s ease-in')])
    ])
  ]
})
export class NotificationListingComponent implements OnInit {
  public isopen: boolean;
  @Input() public notifications: Array<Notification>;

  constructor(
    private taskService: TasksService,
    private notificationService: NotificationsService,
    private connexionService: ConnexionService
  ) {
    this.isopen = false;
  }

  ngOnInit() {}

  actionNotification(notification: Notification) {
    if (notification.data.type === 'task') {
      this.taskService.EditTask(
        notification.data.id_task,
        TacheDialogComponent
      );
    } else if (notification.data.type === 'taskMessage') {
      this.taskService.EditTask(
        notification.data.id_task,
        TacheDialogComponent,
        true
      );
    }
    this.closeNotification(notification);
  }

  closeNotification(notif: Notification) {
    this.notificationService.Clear(notif).then(() => {
      const index = this.notifications.indexOf(notif);
      this.notifications.splice(index, 1);
      if(this.notifications.length===0)
        this.isopen=false;
    });
  }

  clearAll() {
    this.isopen = false;
    this.notificationService.ClearAll(this.connexionService.user).then(() => {
      this.notifications.splice(0,this.notifications.length);
    });
  }

  toggle() {
    if(this.notifications.length>0)
      this.isopen = !this.isopen;
    else
      this.isopen=false;
  }
}
