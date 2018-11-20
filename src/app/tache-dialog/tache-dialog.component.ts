import { DiagrammesService } from './../diagrammes.service';
import {
  UML,
  UMLTable,
  UMLParameter,
  UMLType
} from './../../umltool/umlmodels';
import { FilesListComponent } from './../files/files-list/files-list.component';
import { FilesService } from './../files/files.service';
import { ConnexionService } from './../connexion.service';
import {
  NotificationsService,
  Notification
} from './../notifications/notifications.service';
import { Observable, Subscription } from 'rxjs';
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
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatTableDataSource,
  MatTable
} from '@angular/material';
import {
  Component,
  OnInit,
  Inject,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Users, UsersService } from '../users.service';
import { File } from '../files/files.service';

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

  @ViewChild('descriptionMessage') descriptionMessage: ElementRef;
  @ViewChild('listeFichier') listeFichier: FilesListComponent;

  public users: Array<Users>;

  public assignedUser: AssignedUser;

  public datecreation = '';
  public newTextMessage: string;

  public messages: Array<Message>;

  public nouveauMessage: Subscription;

  private ancienAssignedUser: AssignedUser;

  public currentPage: number;

  public descriptionEdit: boolean;

  public descriptionMarkdown: string;

  public uml: UML;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TacheDialogComponent>,
    private taskService: TasksService,
    private itemservice: ItemsService,
    private taskItemValueService: TaskItemValueService,
    private userService: UsersService,
    private assignedUsersService: AssignedUsersService,
    private messageService: MessagesService,
    private taskMessageService: TaskMessageService,
    private notificationService: NotificationsService,
    private connexionservice: ConnexionService,
    private fileservice: FilesService,
    private diagrammeservice: DiagrammesService
  ) {
    this.uml = new UML();

    this.currentPage = 0;
    if (data.tache) {
      this.task = data.tache;
      if (data.page) {
        this.currentPage = data.page;
      }
    } else {
      this.task = data;
    }
    this.descriptionEdit = true;

    if (this.currentPage === 1) {
      this.nouveauMessage = this.messageService
        .ListenOnTask(this.task)
        .subscribe(newMessage => {
          this.messageService.GetById(newMessage).then(message => {
            this.messages.push(message);
          });
        });
    }
  }

  ngOnInit() {
    this.dialogRef.beforeClosed().subscribe(() => {
      if (this.nouveauMessage) {
        this.nouveauMessage.unsubscribe();
      }
    });

    this.toggleDescription();

    this.assignedUser = new AssignedUser();
    this.userService.GetAll().then(res => {
      this.users = res;
    });

    this.itemservice.GetAll().then(res => {
      this.items = res;

      this.datecreation = new Date(this.task.dh_creation).toLocaleDateString();

      if (this.task.id !== 0) {
        this.diagrammeservice.GetByTaskId(this.task.id).then(diagramme => {
          console.log(diagramme);
          this.uml = (diagramme as any).contenu;
          console.log(this.uml);
        });
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
            this.ancienAssignedUser = this.assignedUser;
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
      if (this.task.id !== 0) {
        this.nouveauMessage = this.messageService
          .ListenOnTask(this.task)
          .subscribe(newMessage => {
            this.messageService.GetById(newMessage).then(message => {
              this.messages.push(message);
            });
          });
      }
    } else if (event.index === 2) {
      this.listeFichier.Refresh();
    } else {
      if (this.nouveauMessage) {
        this.nouveauMessage.unsubscribe();
        this.nouveauMessage = undefined;
      }
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
      message.id_user = this.connexionservice.user.id;
      this.messageService.Add(message).then(res => {
        const taskmessage = new TaskMessage();
        taskmessage.id_message = res.id;
        taskmessage.id_task = this.task.id;
        this.taskMessageService.Add(taskmessage).then(() => {});

        if (this.assignedUser.id !== 0) {
          if (message.id_user !== this.assignedUser.id_user) {
            const notification = new Notification();
            notification.text = 'Message pour la tâche ' + this.task.title;
            notification.id_user = this.assignedUser.id_user;
            notification.data = {
              type: 'taskMessage',
              id_task: this.assignedUser.id_task
            };
            this.notificationService.AddNotification(notification);
          }
        }
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
        this.task.id = res.id;

        this.diagrammeservice.SaveUMLForTask(this.uml, this.task.id);

        for (const item of this.items) {
          this.taskItemValueService.Add(res.id, item.id, item.value);
        }
        this.assignedUser.id_task = this.task.id;
        if (this.assignedUser.id_user !== 0) {
          this.assignedUsersService.Add(this.assignedUser).then(() => {
            const notification = new Notification();
            notification.text =
              'Nouvelle tâche assignée (' + this.task.title + ')';
            notification.id_user = this.assignedUser.id_user;
            notification.data = {
              type: 'task',
              id_task: this.assignedUser.id_task
            };
            this.notificationService.AddNotification(notification);
          });
        }
      });
    } else {
      this.diagrammeservice.SaveUMLForTask(this.uml, this.task.id);

      this.taskService.Update(this.task).then(res => {
        for (const item of this.items) {
          this.taskItemValueService.Update(this.task.id, item.id, item.value);
        }
        this.assignedUser.id_task = this.task.id;
        if (this.assignedUser.id_user !== 0) {
          if (this.assignedUser.id !== 0) {
            this.assignedUsersService.Update(this.assignedUser).then(() => {
              if (this.assignedUser.id_user !== this.connexionservice.user.id) {
                const notification = new Notification();
                notification.text = 'Tâche modifiée (' + this.task.title + ')';
                notification.id_user = this.assignedUser.id_user;
                notification.data = {
                  type: 'task',
                  id_task: this.assignedUser.id_task
                };
                this.notificationService.AddNotification(notification);
              }
            });
          } else {
            this.assignedUsersService.Add(this.assignedUser).then(() => {
              if (this.assignedUser.id_user !== this.connexionservice.user.id) {
                const notification = new Notification();
                notification.text = 'Tâche assignée (' + this.task.title + ')';
                notification.id_user = this.assignedUser.id_user;
                notification.data = {
                  type: 'task',
                  id_task: this.assignedUser.id_task
                };
                this.notificationService.AddNotification(notification);
              }
            });
          }
        }
      });
    }
    this.dialogRef.close();
  }

  delete() {
    this.taskService.Delete(this.task).then(() => this.dialogRef.close());
  }

  prepareForMarkdown(): Promise<void> {
    return new Promise((res, rej) => {
      this.descriptionMarkdown = this.task.description;

      const reg = /image:\/\/([0-9]+)/g;
      let match;

      const tableauImageId = [];
      while ((match = reg.exec(this.descriptionMarkdown))) {
        tableauImageId.push(match);
      }

      if (tableauImageId.length === 0) {
        res();
        return;
      }

      const tableauFichier = [];
      for (const imageId of tableauImageId) {
        this.fileservice.GetById(imageId[1]).then(file => {
          tableauFichier.push(file);

          if (tableauFichier.length === tableauImageId.length) {
            const tableauChaine = [];
            const tableauID = [];

            let indicedepart = 0;

            for (let i = 0; i < tableauImageId.length; i++) {
              tableauChaine.push(
                this.descriptionMarkdown.substring(
                  indicedepart,
                  tableauImageId[i].index
                )
              );

              indicedepart =
                tableauImageId[i].index + tableauImageId[i][0].length;
              tableauID.push(tableauImageId[i][1]);
            }
            tableauChaine.push(
              this.descriptionMarkdown.substring(indicedepart)
            );

            this.descriptionMarkdown = '';
            for (let i = 0; i < tableauChaine.length - 1; i++) {
              const chaine = tableauChaine[i];
              this.descriptionMarkdown += chaine;
              const indexFichier = tableauFichier.findIndex(
                fic => fic.id == tableauID[i]
              );
              this.descriptionMarkdown += tableauFichier[indexFichier].data;
            }
            this.descriptionMarkdown += tableauChaine[tableauChaine.length - 1];

            res();
          }
        });
      }
    });
  }

  toggleDescription() {
    if (this.descriptionEdit) {
      this.prepareForMarkdown().then(
        () => (this.descriptionEdit = !this.descriptionEdit)
      );
    } else {
      this.descriptionEdit = !this.descriptionEdit;
    }
  }

  fileUpload(file: File) {
    if (
      file.filename.indexOf('.jpg') ||
      file.filename.indexOf('.jpeg') ||
      file.filename.indexOf('.png') ||
      file.filename.indexOf('.gif')
    ) {
      const startPos = this.descriptionMessage.nativeElement.selectionStart;
      const endPos = this.descriptionMessage.nativeElement.selectionEnd;
      this.task.description =
        this.descriptionMessage.nativeElement.value.substring(0, startPos) +
        '![' +
        file.filename +
        '](image://' +
        file.id +
        ')' +
        this.descriptionMessage.nativeElement.value.substring(
          endPos,
          this.descriptionMessage.nativeElement.value.length
        );
    }
  }
}
