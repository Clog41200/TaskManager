import { FormGroup, FormControl } from '@angular/forms';
import { Item, ItemsService } from './../items.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit {
  public form = new FormGroup({
    label: new FormControl(''),
    type: new FormControl(''),
    options: new FormControl(''),
    est_tag: new FormControl(false)
  });

  constructor(
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private itemservice: ItemsService
  ) { }

  ngOnInit() {
    if (this.data.id !== 0) {
      this.form.patchValue(this.data);
    }
  }

  onSubmit() {
    this.data.label = this.form.value.label;
    this.data.type = this.form.value.type;
    this.data.options = this.form.value.options;
    this.data.est_tag = this.form.value.est_tag;

    if (this.data.id === 0) {
      this.itemservice.Add(this.data).then(res => {
        this.dialogRef.close('update');
      });
    } else {
      this.itemservice.Update(this.data).then(res => {
        this.dialogRef.close('update');
      });
    }
  }
}
