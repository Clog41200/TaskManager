import { TacheDialogComponent } from './../tache-dialog/tache-dialog.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NotificationsService } from './notifications.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationIndicatorComponent } from './notification-indicator/notification-indicator.component';
import { MatBadgeModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MatBadgeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    AngularFontAwesomeModule
  ],
  exports: [NotificationIndicatorComponent],
  declarations: [NotificationIndicatorComponent],
  providers: [NotificationsService]
})
export class NotificationsModule {}
