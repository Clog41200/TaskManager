import { MarkdownModule } from 'ngx-markdown';
import { MaterialImportModule } from './../material-import/material-import.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectedUsersComponent } from './connected-users/connected-users.component';
import { ChatComponent } from './chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MaterialImportModule, ReactiveFormsModule, MarkdownModule],
  exports: [ConnectedUsersComponent, ChatComponent],
  declarations: [ConnectedUsersComponent, ChatComponent]
})
export class ChatModule {}
