import { UMLClassesComponent } from './../umlclasses/umlclasses.component';
import { MatDialog } from '@angular/material/dialog';
import {
  UMLRenderCanvasDirective,
  Rectangle,
  Texte,
  Line
} from './../umlrender-classes';
import { UMLTable, UMLClasses } from './../umlmodels';
import { Observable } from 'rxjs';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  Input
} from '@angular/core';
import { UML } from '../umlmodels';
import { UMLTableComponent } from '../umltable/umltable.component';

@Component({
  selector: 'uml-tool',
  templateUrl: './uml-tool.component.html',
  styleUrls: ['./uml-tool.component.css']
})
export class UmlToolComponent implements OnInit, OnChanges {
  @Input() public uml: UML;

  @ViewChild('canvas', { static: true }) public canvas: UMLRenderCanvasDirective;
  private cx: CanvasRenderingContext2D;
  private cv: UMLRenderCanvasDirective;
  constructor(private matdialog: MatDialog) { }

  ngOnChanges() {
    this.drawCanvas();
  }

  ngOnInit() {
    this.drawCanvas();
  }

  private drawCanvas() {
    this.canvas.clearChilds();

    for (const table of this.uml.tables) {
      const rect = new Rectangle();
      rect.SetPosition(table.x, table.y);
      rect.SetSizes(100, 300);
      this.canvas.childs.push(rect);

      rect.onDropped.subscribe(() => {
        table.x = rect.x;
        table.y = rect.y;

        this.canvas.draw();
      });

      rect.onDoubleClick.subscribe(() => {
        this.matdialog
          .open(UMLTableComponent, { data: table })
          .afterClosed()
          .subscribe(result => {
            this.drawCanvas();
          });
      });

      const title = new Texte(table.name);
      title.SetPosition(5, 5);
      let dim = title.GetDimensions();
      rect.childs.push(title);

      let y = 10 + dim.h;
      const hauteurLigne = y;
      y += 5;
      for (const field of table.fields) {
        const libelle = new Texte(field.name + ': ' + field.type.name);
        dim = libelle.GetDimensions();
        libelle.SetPosition(5, y);

        y += dim.h;
        y += 5;

        if (dim.w + 10 > rect.width) {
          rect.width = dim.w + 10;
        }

        rect.childs.push(libelle);
      }

      const line = new Line(0, hauteurLigne, rect.width, hauteurLigne);
      line.SetStrokeColor('#000000');
      rect.childs.push(line);

      rect.height = y;
    }

    for (const table of this.uml.classes) {
      const rect = new Rectangle();
      rect.SetPosition(table.x, table.y);
      rect.SetSizes(100, 300);
      this.canvas.childs.push(rect);

      rect.onDropped.subscribe(() => {
        table.x = rect.x;
        table.y = rect.y;

        this.canvas.draw();
      });

      rect.onDoubleClick.subscribe(() => {
        this.matdialog
          .open(UMLClassesComponent, { data: table })
          .afterClosed()
          .subscribe(result => {
            this.drawCanvas();
          });
      });

      const title = new Texte(table.name);
      title.SetPosition(5, 5);
      let dim = title.GetDimensions();
      rect.childs.push(title);

      let y = 10 + dim.h;
      const hauteurLigne = y;
      y += 5;

      let tableauAttributs = table.properties.filter(prop => prop.isPrivate === true);

      for (const field of tableauAttributs) {
        const libelle = new Texte('- ' + field.name + ': ' + field.type.name);
        dim = libelle.GetDimensions();
        libelle.SetPosition(5, y);

        y += dim.h;
        y += 5;

        if (dim.w + 10 > rect.width) {
          rect.width = dim.w + 10;
        }

        rect.childs.push(libelle);
      }

      let line = new Line(0, y, rect.width, y);
      line.SetStrokeColor('#000000');
      rect.childs.push(line);

      tableauAttributs = table.properties.filter(prop => prop.isPrivate === false);

      for (const field of tableauAttributs) {
        const libelle = new Texte('+ ' + field.name + ': ' + field.type.name);
        dim = libelle.GetDimensions();
        libelle.SetPosition(5, y);

        y += dim.h;
        y += 5;

        if (dim.w + 10 > rect.width) {
          rect.width = dim.w + 10;
        }

        rect.childs.push(libelle);
      }

      line = new Line(0, hauteurLigne, rect.width, hauteurLigne);
      line.SetStrokeColor('#000000');
      rect.childs.push(line);

      rect.height = y;
    }


    this.canvas.draw();
  }

  addTable() {
    const table = new UMLTable();
    table.name = 'nouvelle table';
    this.uml.tables.push(table);
    this.drawCanvas();
  }

  addClasse() {
    const classe = new UMLClasses();
    classe.name = 'Nouvelle Classe';
    this.uml.classes.push(classe);
    this.drawCanvas();
  }
}
