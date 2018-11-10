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

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task,
    private dialogRef: MatDialogRef<TacheDialogComponent>, private taskService: TasksService,
    private itemservice: ItemsService) {
    this.task = data;
  }

  ngOnInit() {
    this.itemservice.GetAll().then(res => {
      this.items = res;
    });

    this.formTitle.patchValue(this.task);

  }

  onSubmitMessage() {

  }

  saveAll() {

  }

}
