import { TaskMessageService } from './task-message.service';
import { MessagesService } from './messages.service';
import { AssignedUsersService } from './assigned-users.service';
import { TaskItemValueService } from './task-item-value.service';
import { ItemsTaskModule } from './items-task/items-task.module';
import { EtatsService } from './etats.service';
import { TasksService } from './tasks.service';
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
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule,
  MatTabsModule
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
import { StatesManagmentComponent } from './states-managment/states-managment.component';
import { ItemsManagmentComponent } from './items-managment/items-managment.component';
import { ItemsService } from './items.service';
import { EtatDialogComponent } from './etat-dialog/etat-dialog.component';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { TacheDialogComponent } from './tache-dialog/tache-dialog.component';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { DndModule } from 'ngx-drag-drop';

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.link = (href: string, title: string, text: string) => {
    if (href.indexOf('mailto:') !== -1) {
      return '<a href="' + href + '" title="' + title + '"  >' + text + '</a>';
    } else {
      return '<a href="' + href + '" title="' + title + '" target="_blank" onclick="openurl(event)" >' + text + '</a>';
    }
  };

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  return {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  };
}


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
    UserRightsDialogComponent,
    StatesManagmentComponent,
    ItemsManagmentComponent,
    EtatDialogComponent,
    ItemDialogComponent,
    TacheDialogComponent
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
    AngularFontAwesomeModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    ItemsTaskModule,
    DndModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      }
    }
    )
  ],
  providers: [
    UsersService,
    RightsService,
    ItemsService,
    TasksService,
    EtatsService,
    TaskItemValueService,
    AssignedUsersService,
    MessagesService,
    TaskMessageService
  ],
  entryComponents: [
    UserDialogComponent,
    RightsDialogComponent,
    UserRightsDialogComponent,
    EtatDialogComponent,
    ItemDialogComponent,
    TacheDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
