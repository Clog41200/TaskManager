import { UMLParameter, UMLType } from './../umlmodels';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Inject } from '@angular/core';
import { UMLTable } from '../umlmodels';

@Component({
  selector: 'uml-table',
  templateUrl: './umltable.component.html',
  styleUrls: ['./umltable.component.css']
})
export class UMLTableComponent implements OnInit {
  public fieldform: FormGroup;
  public dataSource: MatTableDataSource<UMLParameter>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UMLTable,
    private dialogref: MatDialogRef<UMLTableComponent>
  ) {
    this.fieldform = new FormGroup({
      name: new FormControl(''),
      type: new FormControl('')
    });

    this.data = data;

    this.dataSource = new MatTableDataSource(this.data.fields);
  }

  ngOnInit() {}

  AddField() {
    const champ = new UMLParameter();
    champ.name = this.fieldform.value.name;
    champ.type = new UMLType();
    champ.type.name = this.fieldform.value.type;
    this.data.fields.push(champ);

    this.fieldform.patchValue({ name: '', type: '' });

    this.dataSource.data = this.data.fields;
  }

  supprimer(field: UMLParameter) {
    const index = this.data.fields.indexOf(field);
    this.data.fields.splice(index, 1);

    this.dataSource.data = this.data.fields;
  }

  moveup(field: UMLParameter) {
    const index = this.data.fields.indexOf(field);
    if (index > 0) {
      this.data.fields.splice(index, 1);
      this.data.fields.splice(index - 1, 0, field);
    }
    this.dataSource.data = this.data.fields;

  }
  movedown(field: UMLParameter) {
    const index = this.data.fields.indexOf(field);
    if (index < this.data.fields.length - 1) {
      this.data.fields.splice(index, 1);
      this.data.fields.splice(index + 1, 0, field);
    }
    this.dataSource.data = this.data.fields;

  }
}
