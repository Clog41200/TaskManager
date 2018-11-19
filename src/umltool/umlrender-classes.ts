import {
  EventEmitter,
  Directive,
  ElementRef,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[uml-render-canvas]',
  exportAs: 'umlRenderCanvas'
})
export class UMLRenderCanvasDirective {
  static mouseDown: boolean;
  static cursorPos: { x: number; y: number };
  static oldCursorPos: { x: number; y: number };
  static currentDraggedObject: UMLObject;
  static cx: CanvasRenderingContext2D;
  public childs: Array<UMLObject>;

  constructor(public canvasEl: ElementRef) {
    this.childs = Array<UMLObject>();
    UMLRenderCanvasDirective.cx = canvasEl.nativeElement.getContext('2d');

    UMLRenderCanvasDirective.mouseDown = false;
    UMLRenderCanvasDirective.cursorPos = { x: 0, y: 0 };
    UMLRenderCanvasDirective.oldCursorPos = { x: 0, y: 0 };
  }

  clearChilds() {
    this.childs = [];
  }

  @HostListener('mousemove', ['$event'])
  @HostListener('mousedown', ['$event'])
  @HostListener('mouseup', ['$event'])
  @HostListener('dblclick', ['$event'])
  mouseEvents(mouseEvent) {

    if (mouseEvent.type === 'mousedown') {
      UMLRenderCanvasDirective.mouseDown = true;
    } else if (mouseEvent.type === 'mouseup') {
      UMLRenderCanvasDirective.mouseDown = false;
    }

    if (mouseEvent.type === 'mousemove') {
      UMLRenderCanvasDirective.cursorPos.x = mouseEvent.offsetX;
      UMLRenderCanvasDirective.cursorPos.y = mouseEvent.offsetY;

      if (UMLRenderCanvasDirective.currentDraggedObject) {
        UMLRenderCanvasDirective.currentDraggedObject.x +=
          UMLRenderCanvasDirective.cursorPos.x -
          UMLRenderCanvasDirective.oldCursorPos.x;
        UMLRenderCanvasDirective.currentDraggedObject.y +=
          UMLRenderCanvasDirective.cursorPos.y -
          UMLRenderCanvasDirective.oldCursorPos.y;
      }
    }

    for (const child of this.childs) {
      child.Event(mouseEvent);
    }

    if (mouseEvent.type === 'mousemove') {
      UMLRenderCanvasDirective.oldCursorPos = { ...UMLRenderCanvasDirective.cursorPos };
    }

    this.draw();
  }

  GetMaxDimensions(): { w: number, h: number } {

    let maxx = 0;
    let maxy = 0;

    for (const child of this.childs) {
      child.absoluteX = child.x;
      child.absoluteY = child.y;
      child.CalculateAbsolutes();

      const sizes = child.GetSizes();
      if (sizes.w + child.absoluteX > maxx) { maxx = sizes.w + child.absoluteX; }
      if (sizes.h + child.absoluteY > maxy) { maxy = sizes.h + child.absoluteY; }
    }

    return { w: maxx, h: maxy };
  }

  draw() {
    const dim = this.GetMaxDimensions();

    this.canvasEl.nativeElement.width = dim.w;
    this.canvasEl.nativeElement.height = dim.h;

    UMLRenderCanvasDirective.cx.clearRect(0, 0, this.canvasEl.nativeElement.width, this.canvasEl.nativeElement.height);

    for (const child of this.childs) {
      child.absoluteX = child.x;
      child.absoluteY = child.y;
      child.Draw(UMLRenderCanvasDirective.cx);
    }

  }
}

export class UMLObject {
  public x: number;
  public y: number;

  public absoluteX: number;
  public absoluteY: number;

  public fillColor: string;
  public strokeColor: string;

  public childs: Array<UMLObject>;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.absoluteX = 0;
    this.absoluteY = 0;

    this.childs = new Array<UMLObject>();

    this.fillColor = '#FFFFFF';
    this.strokeColor = '#000000';
  }

  Event(event: MouseEvent) {
    for (const child of this.childs) {
      child.Event(event);
    }
  }

  CalculateAbsolutes() {
    for (const child of this.childs) {
      child.absoluteX = this.absoluteX + child.x;
      child.absoluteY = this.absoluteY + child.y;
      child.CalculateAbsolutes();
    }
  }

  Draw(cv: CanvasRenderingContext2D) {

    for (const child of this.childs) {
      child.Draw(cv);
    }
  }

  SetStrokeColor(color: string) {
    this.strokeColor = color;
  }
  SetFillColor(color: string) {
    this.fillColor = color;
  }
  SetPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  GetSizes() {

    return { w: 0, h: 0 };
  }
}

export class Line extends UMLObject {


  constructor(private x1, private y1, private x2, private y2) {
    super();
    this.x = x1;
    this.y = y1;
  }
  Draw(cv: CanvasRenderingContext2D) {
    cv.strokeStyle = this.strokeColor;

    cv.beginPath();
    cv.moveTo(this.absoluteX, this.absoluteY);
    cv.lineTo(this.absoluteX + (this.x2 - this.x1), this.absoluteY + (this.y2 - this.y1));
    cv.stroke();
    cv.closePath();

  }
  GetSizes() {
    return { w: this.x2 - this.x1, h: this.y2 - this.y1 };
  }
}

export class Texte extends UMLObject {
  public font: string;

  constructor(public texte: string) {
    super();
    this.font = 'normal 12px Arial';
    this.SetFillColor('#000000');
  }
  SetTexte(texte: string) {
    this.texte = texte;
  }

  GetDimensions(): { w: number, h: number } {
    UMLRenderCanvasDirective.cx.textBaseline = 'top';
    UMLRenderCanvasDirective.cx.font = this.font;
    const measure = UMLRenderCanvasDirective.cx.measureText(this.texte);

    return { w: measure.width, h: measure.fontBoundingBoxDescent - measure.fontBoundingBoxAscent };

  }


  Draw(cv: CanvasRenderingContext2D) {
    cv.textBaseline = 'top';
    cv.strokeStyle = this.strokeColor;
    cv.fillStyle = this.fillColor;
    cv.font = this.font;

    cv.fillText(this.texte, this.absoluteX, this.absoluteY);


    super.Draw(cv);
  }

}

export class Rectangle extends UMLObject {
  public width: number;
  public height: number;

  public onDoubleClick: EventEmitter<any>;
  public onDropped: EventEmitter<any>;

  constructor() {
    super();
    this.width = 0;
    this.height = 0;
    this.onDropped = new EventEmitter<any>();
    this.onDoubleClick = new EventEmitter<any>();
  }

  SetSizes(w: number, h: number) {
    this.width = w;
    this.height = h;
  }

  Event(event: MouseEvent) {
    if (event.type === 'dblclick') {
      if (
        UMLRenderCanvasDirective.cursorPos.x > this.absoluteX &&
        UMLRenderCanvasDirective.cursorPos.x < this.absoluteX + this.width
      ) {
        if (
          UMLRenderCanvasDirective.cursorPos.y > this.absoluteY &&
          UMLRenderCanvasDirective.cursorPos.y < this.absoluteY + this.height
        ) {
          this.onDoubleClick.emit();
        }
      }

    }

    if (event.type === 'mousedown') {
      if (
        UMLRenderCanvasDirective.cursorPos.x > this.absoluteX &&
        UMLRenderCanvasDirective.cursorPos.x < this.absoluteX + this.width
      ) {
        if (
          UMLRenderCanvasDirective.cursorPos.y > this.absoluteY &&
          UMLRenderCanvasDirective.cursorPos.y < this.absoluteY + this.height
        ) {
          UMLRenderCanvasDirective.currentDraggedObject = this;
        }
      }
    }

    if (event.type === 'mouseup') {
      UMLRenderCanvasDirective.currentDraggedObject = undefined;
      this.onDropped.emit();
    }

    super.Event(event);
  }

  Draw(cv: CanvasRenderingContext2D) {
    cv.fillStyle = this.fillColor;
    cv.strokeStyle = this.strokeColor;

    cv.fillRect(this.absoluteX, this.absoluteY, this.width, this.height);
    cv.strokeRect(this.absoluteX, this.absoluteY, this.width, this.height);

    super.Draw(cv);


  }

  GetSizes() {
    return { w: this.width, h: this.height };
  }

}
