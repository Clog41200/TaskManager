import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicTaskItemComponent } from './../dynamic-task-item/dynamic-task-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectItemComponent } from './select-item/select-item.component';
import {
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateItemComponent } from './date-item/date-item.component';
import { TextareaItemComponent } from './textarea-item/textarea-item.component';
import { RichTextItemComponent } from './rich-text-item/rich-text-item.component';
import { UsersItemComponent } from './users-item/users-item.component';
import { GroupUsersItemComponent } from './group-users-item/group-users-item.component';
import { TextItemComponent } from './text-item/text-item.component';
import { DynamicBaseItem } from './dynamic-base-item';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [
    SelectItemComponent,
    DateItemComponent,
    TextareaItemComponent,
    RichTextItemComponent,
    UsersItemComponent,
    GroupUsersItemComponent,
    TextItemComponent
  ],
  exports: [DynamicTaskItemComponent],
  declarations: [
    SelectItemComponent,
    DynamicTaskItemComponent,
    DateItemComponent,
    TextareaItemComponent,
    RichTextItemComponent,
    UsersItemComponent,
    GroupUsersItemComponent,
    TextItemComponent
  ]
})
export class ItemsTaskModule {}
