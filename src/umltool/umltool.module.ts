import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UmlToolComponent } from './uml-tool/uml-tool.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [UmlToolComponent],
  declarations: [UmlToolComponent]
})
export class UMLToolModule { }
