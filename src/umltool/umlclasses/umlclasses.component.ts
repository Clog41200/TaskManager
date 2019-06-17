import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Inject } from '@angular/core';
import { UMLClasses, UMLClassesProperty, UMLType } from '../umlmodels';

@Component({
  selector: 'umlclasses',
  templateUrl: './umlclasses.component.html',
  styleUrls: ['./umlclasses.component.css']
})
export class UMLClassesComponent implements OnInit {
  public formAttribut = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    private: new FormControl(false)
  });

  public formMethode = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    private: new FormControl(false)
  });

  public formParametre = new FormGroup({
    name: new FormControl(''),
    type: new FormControl('')
  });

  public attributDS: MatTableDataSource<UMLClassesProperty>;
  public methodeDS: MatTableDataSource<UMLClassesProperty>;

  constructor(
    private dialogRef: MatDialogRef<UMLClassesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UMLClasses
  ) {}

  ngOnInit() {
    this.attributDS = new MatTableDataSource<UMLClassesProperty>(
      this.data.properties.filter(prop => prop.isFunction === false)
    );
    this.methodeDS = new MatTableDataSource<UMLClassesProperty>(
      this.data.properties.filter(method => method.isFunction === true)
    );
  }

  ajouterAttribut() {
    const prop = new UMLClassesProperty();
    prop.name = this.formAttribut.value.name;
    prop.isFunction = false;
    prop.isPrivate = this.formAttribut.value.private;
    prop.type = new UMLType();
    prop.type.name = this.formAttribut.value.type;

    this.formAttribut.patchValue({
      name: '',
      type: '',
      private: false
    });

    this.data.properties.push(prop);
    this.attributDS.data.push(prop);
    this.attributDS.data = this.attributDS.data;
  }

  ajouterMethode(){
    const prop = new UMLClassesProperty();
    prop.name = 'Nouvelle méthode';
    prop.isFunction = true;
    prop.isPrivate = false;
    prop.type = new UMLType();
    prop.type.name = 'void';

    this.data.properties.push(prop);
    this.methodeDS.data.push(prop);
    this.methodeDS.data = this.methodeDS.data;
  }

  supprimerAttribut(field: UMLClassesProperty) {
    this.attributDS.data.splice(this.attributDS.data.indexOf(field), 1);
    this.data.properties.splice(this.data.properties.indexOf(field), 1);
    this.attributDS.data = this.attributDS.data;
  }

  supprimerMethode(methode: UMLClassesProperty) {
    this.methodeDS.data.splice(this.methodeDS.data.indexOf(methode), 1);
    this.data.properties.splice(this.data.properties.indexOf(methode), 1);
    this.methodeDS.data = this.methodeDS.data;
  }
}
