import { MaterialImportModule } from './../material-import/material-import.module';
import { UMLRenderCanvasDirective } from './umlrender-classes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UmlToolComponent } from './uml-tool/uml-tool.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportModule
  ],
  exports: [UmlToolComponent],
  declarations: [UmlToolComponent, UMLRenderCanvasDirective]
})
export class UMLToolModule { }
