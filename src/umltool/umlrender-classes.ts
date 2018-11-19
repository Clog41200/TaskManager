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
  public childs: Array<UMLObject>;
  private cx: CanvasRenderingContext2D;

  constructor(public canvasEl: ElementRef) {
    this.childs = Array<UMLObject>();
    this.cx = canvasEl.nativeElement.getContext('2d');

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
  @HostListener('dbleclick', ['$event'])
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
        console.log(
          UMLRenderCanvasDirective.oldCursorPos,
          UMLRenderCanvasDirective.cursorPos
        );
        console.log(UMLRenderCanvasDirective.currentDraggedObject);
      }
    }

    for (const child of this.childs) {
      child.Event(mouseEvent);
    }

    if (mouseEvent.type === 'mousemove') {
      UMLRenderCanvasDirective.oldCursorPos = {...UMLRenderCanvasDirective.cursorPos};
    }

    this.draw();
  }

  draw() {
    this.cx.clearRect(0, 0, this.canvasEl.nativeElement.width, this.canvasEl.nativeElement.height);

    for (const child of this.childs) {
      child.Draw(this.cx);
    }
  }
}

export class UMLObject {
  public x: number;
  public y: number;

  public fillColor: string;
  public strokeColor: string;

  public childs: Array<UMLObject>;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.childs = new Array<UMLObject>();
    this.fillColor = '#FFFFFF';
    this.strokeColor = '#000000';
  }

  Event(event: MouseEvent) {
    for (const child of this.childs) {
      child.Event(event);
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
  }

  SetSizes(w: number, h: number) {
    this.width = w;
    this.height = h;
  }

  Event(event: MouseEvent) {
    if (event.type === 'mousedown') {
      if (
        UMLRenderCanvasDirective.cursorPos.x > this.x &&
        UMLRenderCanvasDirective.cursorPos.x < this.x + this.width
      ) {
        if (
          UMLRenderCanvasDirective.cursorPos.y > this.y &&
          UMLRenderCanvasDirective.cursorPos.y < this.y + this.height
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

    console.log('draw rectangle');
    cv.fillRect(this.x, this.y, this.width, this.height);
    cv.strokeRect(this.x, this.y, this.width, this.height);

    super.Draw(cv);
  }
}
