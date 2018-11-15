import { ConnexionService } from './../../connexion.service';
import { TasksService } from './../../tasks.service';
import { NotificationsService, Notification } from './../notifications.service';
import { PostgresqlService } from './../../postgresql.service';
import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/users.service';
import { TacheDialogComponent } from 'src/app/tache-dialog/tache-dialog.component';

@Component({
  selector: 'app-notification-indicator',
  templateUrl: './notification-indicator.component.html',
  styleUrls: ['./notification-indicator.component.css']
})
export class NotificationIndicatorComponent implements OnInit {
  public user: Users;

  public notifications: Array<Notification>;

  constructor(
    private pg: PostgresqlService,
    private notificationService: NotificationsService,
    private taskService: TasksService,
    private connexionService: ConnexionService
  ) {
    this.user = this.connexionService.user;
    this.notifications = [];
  }

  ngOnInit() {
    this.notificationService
      .GetByUser(this.user)
      .then(res => (this.notifications = res));

    this.notificationService
      .OnNewNotification(this.user.id)
      .subscribe(newid => {
        this.notificationService
          .GetById(newid)
          .then(notif => this.notifications.push(notif));
      });
  }

  clearNotification() {
    this.notificationService.ClearAll(this.user).then(() => {
      this.notifications = [];
    });
  }

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
  }
}
