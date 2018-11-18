export class UMLRenderCanvas {
  public childs: Array<UMLObject>;
  constructor() {
    this.childs = Array<UMLObject>();
  }

  draw(cv: CanvasRenderingContext2D) {
    for (const child of this.childs) {
      child.Draw(cv);
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

  Draw(cv: CanvasRenderingContext2D) {
    for (const child of this.childs) {
      child.Draw(cv);
    }
  }

  SetStrokeColor(color: string) { this.strokeColor = color; }
  SetFillColor(color: string) { this.fillColor = color; }
}

export class Rectangle extends UMLObject {

  public width: number;
  public height: number;

  constructor() {
    super();
    this.width = 0;
    this.height = 0;
  }

  Draw(cv: CanvasRenderingContext2D) {
    cv.fillStyle = this.fillColor;
    cv.strokeStyle = this.strokeColor;

    cv.fillRect(this.x, this.y, this.width, this.height);
    cv.strokeRect(this.x, this.y, this.width, this.height);

    super.Draw(cv);
  }

}
