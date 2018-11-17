import { MessagesService } from './../app/messages.service';
import { MaterialImportModule } from './../material-import/material-import.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectedUsersComponent } from './connected-users/connected-users.component';
import { ChatComponent } from './chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'src/messages/messages.module';
import { TaskMessageService } from 'src/app/task-message.service';

@NgModule({
  imports: [CommonModule, MaterialImportModule, ReactiveFormsModule, MessagesModule],
  exports: [ConnectedUsersComponent, ChatComponent],
  declarations: [ConnectedUsersComponent, ChatComponent],
  providers: [MessagesService, TaskMessageService]
})
export class ChatModule { }
