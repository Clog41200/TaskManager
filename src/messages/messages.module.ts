import { MarkdownModule } from 'ngx-markdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryMessageComponent } from './history-message/history-message.component';

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule
  ],
  exports: [HistoryMessageComponent],
  declarations: [HistoryMessageComponent]
})
export class MessagesModule { }
