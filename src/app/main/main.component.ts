import { AssignedUser } from './../assigned-users.service';
import { UsersService } from './../users.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { EtatsService } from './../etats.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Users } from '../users.service';
import { Etat } from '../etats.service';
import { TacheDialogComponent } from '../tache-dialog/tache-dialog.component';
import { Task, TasksService } from '../tasks.service';
import { TaskItemValue } from '../task-item-value.service';
import { offset, position, getOffset } from 'caret-pos';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public etats: Array<Etat>;
  public currentUser: Users;
  public tasks: Array<Task>;
  public tasksAffichees: Array<Task>;

  public users: Array<Users>;
  public assignedusers: Array<AssignedUser>;

  public form = new FormGroup({
    keywords: new FormControl('')
  });

  public nouvelleTacheSouscription: Subscription;
  public deleteTask: Subscription;
  public updatedTask: Subscription;
  public tags: Array<TaskItemValue>;

  @ViewChild('choixUser') choixUser: ElementRef;

  constructor(
    private elec: ElectronService,
    public etatService: EtatsService,
    private dg: MatDialog,
    private taskService: TasksService,
    private userservice: UsersService
  ) {
    this.tasks = new Array<Task>();
    this.tasksAffichees = new Array<Task>();
    this.tags = new Array<TaskItemValue>();
  }

  ngOnInit() {
    this.userservice.GetAll().then(res => this.users = res);

    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.etatService.GetAll().then(res => {
      this.etats = res;
      this.refreshTasks();
    });

    this.deleteTask = this.taskService.OnDeleted().subscribe(task_id => {
      const index = this.tasks.findIndex(tache => tache.id === task_id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        this.taskService.GetAssignedUsersByTasks(this.tasks).then(asssigneds => {
          this.assignedusers = asssigneds;
          this.taskService.GetTagsByTasks(this.tasks).then(tags => {
            this.tags = tags;
            this.search();
          });
        });
      }
    });

    this.updatedTask = this.taskService.OnUpdated().subscribe(id_task => {
      this.taskService.GetById(id_task).then(latache => {
        const index = this.tasks.findIndex(tache => tache.id === latache.id);
        if (index !== -1) {
          this.tasks[index] = { ...latache };
        }
        this.taskService.GetAssignedUsersByTasks(this.tasks).then(asssigneds => {
          this.assignedusers = asssigneds;

          this.taskService.GetTagsByTasks(this.tasks).then(tags => {
            this.tags = tags;
            this.search();
          });
        });

      });
    });

    this.nouvelleTacheSouscription = this.taskService
      .OnNew()
      .subscribe(newTask => {
        this.taskService.GetById(newTask).then(task => {
          this.tasks.push(task);
          this.taskService.GetAssignedUsersByTasks(this.tasks).then(asssigneds => {
            this.assignedusers = asssigneds;

            this.taskService.GetTagsByTasks(this.tasks).then(tags => {
              this.tags = tags;
              this.search();
            });
          });
        });
      });
  }

  refreshTasks() {
    this.taskService.GetAll(this.etats).then(taches => {
      this.tasks = taches;
      this.tasksAffichees = this.tasks;
      this.taskService.GetAssignedUsersByTasks(this.tasks).then(asssigneds => {
        this.assignedusers = asssigneds;
        this.taskService.GetTagsByTasks(this.tasks).then(tags => {
          this.tags = tags;
        });
      });
    });
  }

  addTask(etat: number) {
    const task = new Task();
    task.id_etat = etat;
    this.dg.open(TacheDialogComponent, { data: task });
  }

  editerTache(task: Task) {
    const copy = { ...task };
    this.dg.open(TacheDialogComponent, { data: copy });
  }

  GetTacheByEtat(etat: Etat) {
    const retour = this.tasksAffichees.filter(val => val.id_etat === etat.id);
    return retour;
  }

  GetAssignedUsers(task: Task) {
    this.taskService.GetAssignedUsersByTasks(this.tasks).then(res => this.assignedusers = res);
  }

  GetTags(task: Task): Array<TaskItemValue> {
    return this.tags.filter(tag => (tag.id_task === task.id && tag.valeur != null));
  }

  onDrop(event, etat_id: number) {
    event.data.id_etat = etat_id;
    this.taskService.Update(event.data);
  }

  search() {
    if (this.form.value.keywords === '') {
      this.tasksAffichees = this.tasks.slice();
    } else {
      this.tasksAffichees = this.tasks.slice();

      const motcles = this.form.value.keywords.split(' ');
      for (const mot of motcles) {
        if (mot[0] === '#') { // recherche dans les tags
          const tags = this.tags.filter(tag => tag.valeur.search(new RegExp(mot.substr(1), 'i')) === -1);
          for (const tag of tags) {
            this.tasksAffichees.splice(this.tasks.findIndex(task => task.id === tag.id_task), 1);
          }
        } else if (mot[0] === '@') {
          const assignedtask = this.assignedusers.filter(link => link.id_user !== parseInt(mot.substr(1), 10));
          this.tasksAffichees = this.tasksAffichees.filter(task => assignedtask.findIndex(link => link.id_task === task.id) !== -1);

        } else {
          this.tasksAffichees = this.tasksAffichees.filter(task => task.title.search(new RegExp(mot.substr(1), 'i')) !== -1);
        }
      }

      // on supprime les dupliquées
      this.tasksAffichees = this.tasksAffichees.filter((task, index, self) => index === self.findIndex(t => t.id === task.id));
    }

  }

  onKeyUp(event) {
    const input = (event.target as HTMLInputElement);
    const offsets = offset(input);
    if (event.data === '@') {
      this.choixUser.nativeElement.style.display = 'block';
    }
    if (event.data === ' ' || event.inputType.search('deleteContent') !== -1) {
      this.choixUser.nativeElement.style.display = 'none';
    }
    this.choixUser.nativeElement.style.top = (offsets.top + offsets.height) + 'px';
    this.choixUser.nativeElement.style.left = offsets.left + 'px';
  }

  choixuser(user: Users) {
    this.form.patchValue({ keywords: this.form.value.keywords + user.id });
    this.choixUser.nativeElement.style.display = 'none';
    this.search();
  }
}
