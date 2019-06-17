import { FormGroup, FormControl } from '@angular/forms';
import { Item, ItemsService } from './../items.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit {
  public form = new FormGroup({
    label: new FormControl(''),
    type: new FormControl(''),
    est_tag: new FormControl(false)
  });

  public selectdata: MatTableDataSource<any>;

  constructor(
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private itemservice: ItemsService
  ) {}

  ngOnInit() {
    let tableau = [];
    if (this.data.id !== 0) {
      this.form.patchValue(this.data);
      try {
        tableau = JSON.parse(this.data.options);
      } catch (e) {
        const elements = this.data.options.split('\n');
        for (const elem of elements) {
          tableau.push({ label: elem, couleur: '#00000000' });
        }
      }
      this.selectdata = new MatTableDataSource<any>(tableau);
    } else {
      this.selectdata = new MatTableDataSource<any>(tableau);
    }
  }

  supprimeroptions(item: any) {
    const index = this.selectdata.data.indexOf(item);
    this.selectdata.data.splice(index, 1);
    this.selectdata.data = this.selectdata.data;
  }

  onSubmit() {
    this.data.label = this.form.value.label;
    this.data.type = this.form.value.type;
    this.data.options = JSON.stringify(this.selectdata.data);
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
