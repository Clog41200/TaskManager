import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitAppComponent } from './init-app/init-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';


const routes: Routes = [{
  path: "nousers", component: InitAppComponent
}, {
  path: "", component: MainComponent,
}];

@NgModule({
  declarations: [InitAppComponent,MainComponent],
  imports: [RouterModule.forRoot(routes),
    FormsModule, ReactiveFormsModule, CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
