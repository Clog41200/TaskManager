import { TaskItemValueService } from './../task-item-value.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Item, ItemsService } from './../items.service';
import { Task, TasksService } from './../tasks.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private dialogRef: MatDialogRef<TacheDialogComponent>,
    private taskService: TasksService,
    private itemservice: ItemsService,
    private taskItemValueService: TaskItemValueService
  ) {
    this.task = data;
  }

  ngOnInit() {
    this.itemservice.GetAll().then(res => {
      this.items = res;

      if (this.task.id !== 0) {
        for (const item of this.items) {
          this.taskItemValueService
            .GetValue(this.task.id, item.id)
            .then(retour => {
              if (retour.length > 0) { item.value = retour[0].valeur; }
            });
        }
      }
    });

    this.formTitle.patchValue(this.task);
  }

  onSubmitMessage() {}

  saveAll() {
    if (this.task.id === 0) {
      this.taskService.Add(this.task).then(res => {
        for (const item of this.items) {
          this.taskItemValueService.Add(res[0].id, item.id, item.value);
        }
      });
    } else {
      this.taskService.Update(this.task).then(res => {
        for (const item of this.items) {
          this.taskItemValueService.Update(this.task.id, item.id, item.value);
        }
      });
    }
    this.dialogRef.close('update');
  }
}
