import { MessagesModule } from './../messages/messages.module';
import { ChatModule } from './../chat/chat.module';
import { MaterialImportModule } from './../material-import/material-import.module';
import { FilesModule } from './files/files.module';
import { ConnexionService } from './connexion.service';
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
import { UserAccountComponent } from './user-account/user-account.component';
import { UsersRightsService } from './users-rights.service';
import { NotificationsModule } from './notifications/notifications.module';


// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();



  renderer.image = (href: string, title: string, text: string): string => {

    return '<img src="' + href + '" style="max-width:300px;max-height:300px" title="' + text + '"/>';

  };

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
    TacheDialogComponent,
    UserAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    NgxElectronModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ItemsTaskModule,
    DndModule,
    MaterialImportModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      }
    }
    ),
    NotificationsModule,
    FilesModule,
    ChatModule,
    MessagesModule
  ],
  providers: [
    UsersService,
    RightsService,
    ItemsService,
    TasksService,
    EtatsService,
    TaskItemValueService,
    AssignedUsersService,
    UsersRightsService,
    ConnexionService
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
