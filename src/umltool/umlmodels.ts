export class UML {
  public tables: Array<UMLTable>;
  public classes: Array<UMLClasses>;

  constructor() {
    this.tables = new Array<UMLTable>();
    this.classes = new Array<UMLClasses>();
  }
}

export class UMLTable {
  public x: number;
  public y: number;
  public name: string;
  public fields: Array<UMLParameter>;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.name = '';
    this.fields = new Array<UMLParameter>();
  }
}

export class UMLClasses {
  public x: number;
  public y: number;

  public name: string;
  public properties: Array<UMLClassesProperty>;
  constructor() {
    this.x = 0;
    this.y = 0;
    this.name = '';
    this.properties = new Array<UMLClassesProperty>();
  }
}

export class UMLClassesProperty {
  public isFunction: boolean;
  public isPrivate: boolean;
  public name: string;
  public parameters: Array<UMLParameter>;
}

export class UMLParameter {
  public type: UMLType;
  public name: string;
}

export class UMLType {
  public name: string;
}
