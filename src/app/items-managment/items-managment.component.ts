import { ItemDialogComponent } from './../item-dialog/item-dialog.component';
import { MatDialog } from '@angular/material';
import { Item, ItemsService } from './../items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-managment',
  templateUrl: './items-managment.component.html',
  styleUrls: ['./items-managment.component.css']
})
export class ItemsManagmentComponent implements OnInit {
  public items: Array<Item>;

  constructor(private itemservice: ItemsService, private dg: MatDialog) {}

  ngOnInit() {
    this.itemservice.GetAll().then(res => {
      this.items = res;
    });
  }

  ajouter() {
    this.dg
      .open(ItemDialogComponent, { data: new Item() })
      .afterClosed()
      .subscribe(res => {
        if (res === 'update') {
          this.ngOnInit();
        }
      });
  }

  edit(item: Item) {
    this.dg
      .open(ItemDialogComponent, { data: item })
      .afterClosed()
      .subscribe(res => {
        if (res === 'update') {
          this.ngOnInit();
        }
      });
  }

  delete(item: Item) {
    this.itemservice.Delete(item).then(() => {
      this.ngOnInit();
    });
  }

  moveup(item: Item) {
    const index = this.items.indexOf(item);
    if (index > 0) {
      const objavant = this.items[index - 1];
      objavant.ordre++;
      item.ordre--;
      this.itemservice.Update(objavant).then(() => {
        this.itemservice.Update(item).then(() => {
          this.ngOnInit();
        });
      });
    }
  }

  movedown(item: Item) {
    const index = this.items.indexOf(item);
    if (index < this.items.length - 1) {
      const objavant = this.items[index + 1];
      objavant.ordre--;
      item.ordre++;
      this.itemservice.Update(objavant).then(() => {
        this.itemservice.Update(item).then(() => {
          this.ngOnInit();
        });
      });
    }
  }
}
