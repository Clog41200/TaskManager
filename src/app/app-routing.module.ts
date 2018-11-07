import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitAppComponent } from './init-app/init-app.component';
import { MainComponent } from './main/main.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { UsersManagmentComponent } from './users-managment/users-managment.component';
import { RightsManagmentComponent } from './rights-managment/rights-managment.component';

const routes: Routes = [
  { path: 'nousers', component: InitAppComponent },
  { path: '', component: ConnexionComponent },
  { path: 'main', component: MainComponent },
  { path: 'manageUsers', component: UsersManagmentComponent },
  { path: 'manageRights', component: RightsManagmentComponent }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
