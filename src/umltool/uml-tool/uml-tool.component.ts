import { UMLRenderCanvasDirective, Rectangle } from './../umlrender-classes';
import { UMLTable } from './../umlmodels';
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

@Component({
  selector: 'uml-tool',
  templateUrl: './uml-tool.component.html',
  styleUrls: ['./uml-tool.component.css']
})
export class UmlToolComponent implements OnInit, OnChanges {
  @Input() public uml: UML;

  @ViewChild('canvas') public canvas: UMLRenderCanvasDirective;
  private cx: CanvasRenderingContext2D;
  private cv: UMLRenderCanvasDirective;
  constructor() {}

  ngOnChanges() {}

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
    }

    this.canvas.draw();
  }

  doubleclick(event) {}

  addTable() {
    const table = new UMLTable();
    table.name = 'nouvelle table';
    this.uml.tables.push(table);
    this.drawCanvas();
  }
}
