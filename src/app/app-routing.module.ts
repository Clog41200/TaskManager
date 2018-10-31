import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitAppComponent } from './init-app/init-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


const routes: Routes = [{
  path: "nousers", component: InitAppComponent
}];

@NgModule({
  declarations: [InitAppComponent],
  imports: [RouterModule.forRoot(routes),
    FormsModule, ReactiveFormsModule, CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
