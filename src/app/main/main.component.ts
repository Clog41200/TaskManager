import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { EtatsService } from './../etats.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Users } from '../users.service';
import { Etat } from '../etats.service';
import { TacheDialogComponent } from '../tache-dialog/tache-dialog.component';
import { Task, TasksService } from '../tasks.service';
import { isFulfilled } from 'q';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public etats: Array<Etat>;
  public currentUser: Users;
  public tasks: Array<Task>;

  public form = new FormGroup({
    keywork: new FormControl('')
  });

  public nouvelleTacheSouscription: Subscription;
  public deleteTask: Subscription;
  public updatedTask: Subscription;

  constructor(
    private elec: ElectronService,
    public etatService: EtatsService,
    private dg: MatDialog,
    private taskService: TasksService
  ) {
    this.tasks = new Array<Task>();
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.elec.remote.getCurrentWindow().maximize();
    this.elec.remote.getCurrentWindow().show();
    this.etatService.GetAll().then(res => {
      this.etats = res;
      this.refreshTasks();
    });

    this.deleteTask = this.taskService.OnDeleted().subscribe(task_id => {
      const index = this.tasks.findIndex(tache => tache.id === task_id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    });

    this.updatedTask = this.taskService.OnUpdated().subscribe(id_task => {
      this.taskService.GetById(id_task).then(latache => {
        const index = this.tasks.findIndex(tache => tache.id === id_task);
        if (index !== -1) {
          this.tasks[index] = { ...latache };
        }
      });
    });

    this.nouvelleTacheSouscription = this.taskService
      .OnNew()
      .subscribe(newTask => {
        this.taskService.GetById(newTask).then(task => {
          this.tasks.push(task);
        });
      });
  }

  refreshTasks() {
    this.taskService.GetAll(this.etats).then(taches => {
      this.tasks = taches;
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
    const retour = this.tasks.filter(val => val.id_etat === etat.id);
    return retour;
  }

  onDrop(event, etat_id: number) {
    console.log(event, etat_id);

    event.data.id_etat = etat_id;
    this.taskService.Update(event.data);
  }
}
