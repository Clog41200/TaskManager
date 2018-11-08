import { ItemDialogComponent } from './../item-dialog/item-dialog.component';
import { MatDialog } from '@angular/material';
import { Item, ItemsService } from './../items.service';
import { Component, OnInit } from '@angular/core';
import { timingSafeEqual } from 'crypto';

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
}
