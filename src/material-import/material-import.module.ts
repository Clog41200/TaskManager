import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatMenuModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatTableModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule,
  MatTabsModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatBadgeModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    AngularFontAwesomeModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatBadgeModule
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    AngularFontAwesomeModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatBadgeModule
  ],
  declarations: []
})
export class MaterialImportModule {}
