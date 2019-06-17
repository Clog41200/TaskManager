import { GroupUsersItemComponent } from './../items-task/group-users-item/group-users-item.component';
import { TextareaItemComponent } from './../items-task/textarea-item/textarea-item.component';
import { Item } from './../items.service';
import {
  Component,
  OnInit,
  Input,
  ComponentRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { SelectItemComponent } from '../items-task/select-item/select-item.component';
import { TextItemComponent } from '../items-task/text-item/text-item.component';
import { DateItemComponent } from '../items-task/date-item/date-item.component';
import { RichTextItemComponent } from '../items-task/rich-text-item/rich-text-item.component';
import { UsersItemComponent } from '../items-task/users-item/users-item.component';
import { DynamicBaseItem } from '../items-task/dynamic-base-item';

@Component({
  selector: 'app-dynamic-task-item',
  templateUrl: './dynamic-task-item.component.html',
  styleUrls: ['./dynamic-task-item.component.css']
})
export class DynamicTaskItemComponent implements OnInit, OnDestroy {
  @Input() value: any;
  @Input() item: Item;

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  private componentRef: ComponentRef<{}>;

  private typeAssociation = {
    text: TextItemComponent,
    textarea: TextareaItemComponent,
    date: DateItemComponent,
    richtext: RichTextItemComponent,
    users: UsersItemComponent,
    groupusers: GroupUsersItemComponent,
    select: SelectItemComponent
  };

  constructor(private componentfactory: ComponentFactoryResolver) {}

  ngOnInit() {
    const componentsouhaite = this.typeAssociation[this.item.type];
    if (componentsouhaite) {
      const factory = this.componentfactory.resolveComponentFactory(
        this.typeAssociation[this.item.type]
      );
      this.componentRef = this.container.createComponent(factory);

      const instance = <DynamicBaseItem>this.componentRef.instance;
      instance.item = this.item;
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}


