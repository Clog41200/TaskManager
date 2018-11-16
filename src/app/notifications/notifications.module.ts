import { NotificationsService } from './notifications.service';
import { NgModule } from '@angular/core';
import { NotificationIndicatorComponent } from './notification-indicator/notification-indicator.component';
import { MaterialImportModule } from 'src/material-import/material-import.module';

@NgModule({
  imports: [
    MaterialImportModule
  ],
  exports: [NotificationIndicatorComponent],
  declarations: [NotificationIndicatorComponent],
  providers: [NotificationsService]
})
export class NotificationsModule {}
