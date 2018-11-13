import { TaskMessageService, TaskMessage } from './../task-message.service';
import { MessagesService, Message } from './../messages.service';
import {
  AssignedUsersService,
  AssignedUser
} from './../assigned-users.service';
import { TaskItemValueService } from './../task-item-value.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Item, ItemsService } from './../items.service';
import { Task, TasksService } from './../tasks.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Users, UsersService } from '../users.service';

@Component({
  selector: 'app-tache-dialog',
  templateUrl: './tache-dialog.component.html',
  styleUrls: ['./tache-dialog.component.css']
})
export class TacheDialogComponent implements OnInit {
  public items: Array<Item>;
  public task: Task;
  public formTitle = new FormGroup({
    title: new FormControl('')
  });
  public formMessage = new FormGroup({
    message: new FormControl('')
  });

  public users: Array<Users>;

  public assignedUser: AssignedUser;

  public datecreation = '';
  public newTextMessage: string;

  public messages: Array<Message>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private dialogRef: MatDialogRef<TacheDialogComponent>,
    private taskService: TasksService,
    private itemservice: ItemsService,
    private taskItemValueService: TaskItemValueService,
    private userService: UsersService,
    private assignedUsersService: AssignedUsersService,
    private messageService: MessagesService,
    private taskMessageService: TaskMessageService) {
    this.task = data;
  }


  ngOnInit() {
    this.assignedUser = new AssignedUser();
    this.userService.GetAll().then(res => {
      this.users = res;
    });

    this.itemservice.GetAll().then(res => {
      this.items = res;

      this.datecreation = new Date(this.task.dh_creation).toLocaleDateString();

      if (this.task.id !== 0) {
        for (const item of this.items) {
          this.taskItemValueService
            .GetValue(this.task.id, item.id)
            .then(retour => {
              if (retour.length > 0) {
                item.value = retour[0].valeur;
              }
            });
        }

        this.assignedUsersService.GetByTask(this.task.id).then(retour => {
          if (retour.length > 0) {
            this.assignedUser = retour[0];
          }
        });

        this.loadMessage();
      }
    });

    this.formTitle.patchValue(this.task);
  }

  changementTab(event) {

    if (event.index === 1) {
      this.loadMessage();
    }
  }

  loadMessage() {
    if (this.task.id !== 0) {
      this.messageService.GetAllByTask(this.task).then(messages => {
        this.messages = messages;

      });
    }
  }

  onSubmitMessage() {
    if (this.task.id === 0) {
      alert('La tâche doit être sauvegardée au préalable.');
    } else {
      const message = new Message();
      message.text = this.formMessage.value.message;
      message.id_user = JSON.parse(localStorage.getItem('user')).id;
      this.messageService.Add(message).then(res => {
        const taskmessage = new TaskMessage();
        taskmessage.id_message = res.id;
        taskmessage.id_task = this.task.id;
        this.taskMessageService.Add(taskmessage).then(() => {
          this.loadMessage();
        });
      });
    }

    this.formMessage.patchValue({ message: '' });
  }

  saveAll() {
    if (this.task.title === '') {
      alert('Il faut un titre à la tâche.');
      return;
    }


    if (this.task.id === 0) {
      this.taskService.Add(this.task).then(res => {
        this.task.id = res[0].id;
        for (const item of this.items) {
          this.taskItemValueService.Add(res[0].id, item.id, item.value);
        }
        this.assignedUser.id_task = this.task.id;
        if (this.assignedUser.id_user !== 0) {
          this.assignedUsersService.Add(this.assignedUser);
        }
      });
    } else {
      this.taskService.Update(this.task).then(res => {
        for (const item of this.items) {
          this.taskItemValueService.Update(this.task.id, item.id, item.value);
        }
        this.assignedUser.id_task = this.task.id;

        if (this.assignedUser.id !== 0) {
          this.assignedUsersService.Update(this.assignedUser);
        } else {
          this.assignedUsersService.Add(this.assignedUser);
        }
      });
    }
    this.dialogRef.close('update');
  }

  delete() {
    this.taskService
      .Delete(this.task)
      .then(() => this.dialogRef.close('update'));
  }

  getPseudo(userId: number) {
    const index = this.users.findIndex(user => userId == user.id);
    if (index >= 0) {
      return this.users[index].pseudo;
    }
    return '';
  }

  formatDH(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString('fr');
  }
}
