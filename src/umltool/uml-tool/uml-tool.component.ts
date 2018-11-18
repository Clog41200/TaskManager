import { UMLTable } from './../umlmodels';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import { UML } from '../umlmodels';

@Component({
  selector: 'uml-tool',
  templateUrl: './uml-tool.component.html',
  styleUrls: ['./uml-tool.component.css']
})
export class UmlToolComponent implements OnInit, OnChanges {

  @Input() public uml: UML;

  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;

  constructor() { }

  ngOnChanges() {
    this.drawCanvas();
  }

  ngOnInit() {
    const canvasEl = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');


    this.drawCanvas();
  }

  private drawCanvas() {
    this.uml.draw(this.cx);
  }

  mousemove(event) {
  }
  mousedown(event) {
  }
  mouseup(event) {
  }
  doubleclick(event) {
  }

  addTable() {
    const table = new UMLTable();

    table.name = 'nouvelle table';
    this.uml.tables.push(table);
    this.drawCanvas();

  }
}
