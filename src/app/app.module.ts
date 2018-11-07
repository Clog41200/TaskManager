import { RightsService } from './rights.service';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';
import { RightsManagmentComponent } from './rights-managment/rights-managment.component';
import { UsersManagmentComponent } from './users-managment/users-managment.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { MainComponent } from './main/main.component';
import { InitAppComponent } from './init-app/init-app.component';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatTableModule,
  MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxElectronModule } from 'ngx-electron';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { RightsDialogComponent } from './rights-dialog/rights-dialog.component';
import { UserRightsDialogComponent } from './user-rights-dialog/user-rights-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RightsDialogComponent,
    InitAppComponent,
    MainComponent,
    ConnexionComponent,
    UsersManagmentComponent,
    RightsManagmentComponent,
    UserDialogComponent,
    UserRightsDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    NgxElectronModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularFontAwesomeModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [UsersService, RightsService],
  entryComponents: [UserDialogComponent, RightsDialogComponent,UserRightsDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
