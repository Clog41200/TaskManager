import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialImportModule } from './../material-import/material-import.module';
import { UMLRenderCanvasDirective } from './umlrender-classes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UmlToolComponent } from './uml-tool/uml-tool.component';
import { UMLTableComponent } from './umltable/umltable.component';
import { UMLClassesComponent } from './umlclasses/umlclasses.component';

@NgModule({
  imports: [CommonModule, MaterialImportModule, FormsModule, ReactiveFormsModule],
  exports: [UmlToolComponent],
  declarations: [UmlToolComponent, UMLRenderCanvasDirective, UMLTableComponent, UMLClassesComponent],
  entryComponents: [UMLTableComponent, UMLClassesComponent]
})
export class UMLToolModule {}
