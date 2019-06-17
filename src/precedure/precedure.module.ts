import { RecursiveCategorieComponent } from './../app/recursive-categorie/recursive-categorie.component';
import { CommonModule } from '@angular/common';
import { MaterialImportModule } from './../material-import/material-import.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainFrontComponent } from './main-front/main-front.component';
import { MainBackComponent } from './main-back/main-back.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MainFrontComponent },
  { path: 'Admin', component: MainBackComponent}

];

@NgModule({
  declarations: [MainFrontComponent, MainBackComponent, RecursiveCategorieComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialImportModule
  ],
  exports : [ RouterModule ]
})

export class PrecedureModule { }
