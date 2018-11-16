import { MaterialImportModule } from './../../material-import/material-import.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicTaskItemComponent } from './../dynamic-task-item/dynamic-task-item.component';
import { NgModule } from '@angular/core';
import { SelectItemComponent } from './select-item/select-item.component';
import { DateItemComponent } from './date-item/date-item.component';
import { TextareaItemComponent } from './textarea-item/textarea-item.component';
import { RichTextItemComponent } from './rich-text-item/rich-text-item.component';
import { UsersItemComponent } from './users-item/users-item.component';
import { GroupUsersItemComponent } from './group-users-item/group-users-item.component';
import { TextItemComponent } from './text-item/text-item.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialImportModule
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
