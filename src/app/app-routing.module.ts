import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitAppComponent } from './init-app/init-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { UsersManagmentComponent } from './users-managment/users-managment.component';
import { RightsManagmentComponent } from './rights-managment/rights-managment.component';
import {
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule
} from '@angular/material';
import { UsersService } from './users.service';

const routes: Routes = [
  { path: 'nousers', component: InitAppComponent },
  { path: '', component: ConnexionComponent },
  { path: 'main', component: MainComponent },
  { path: 'manageUsers', component: UsersManagmentComponent },
  { path: 'manageRights', component: RightsManagmentComponent }
];

@NgModule({
  declarations: [
    InitAppComponent,
    MainComponent,
    ConnexionComponent,
    UsersManagmentComponent,
    RightsManagmentComponent,
    UserDialogComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularFontAwesomeModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  exports: [RouterModule],
  providers: [UsersService],
  entryComponents: [UserDialogComponent]
})
export class AppRoutingModule {}
