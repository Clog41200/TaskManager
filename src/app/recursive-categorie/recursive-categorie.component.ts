import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'recursive-categorie',
  templateUrl: './recursive-categorie.component.html',
  styleUrls: ['./recursive-categorie.component.css']
})
export class RecursiveCategorieComponent implements OnInit {
  public hierar: [];
  public parentID: any;

  @Input()
  set hierarchy(hierarchy: any) {
    this.hierar = hierarchy;
    this.filtrer();
  }

  @Input()
  set parentId(parentId: any) {
    this.parentID = parentId;
    this.filtrer();
  }

  public hierarchyChild: [];

  constructor() {
    this.hierarchyChild = [];
  }

  filtrer() {
    console.log('parentID = ' + this.parentID);
    console.log(this.hierar);

    if (this.hierar != undefined) {
      this.hierarchyChild = this.hierar.filter(
        val => val.id_parent == this.parentID
      );
    }
    console.log(this.hierarchyChild);
  }

  ngOnInit() {}
}
