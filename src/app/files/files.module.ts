import { MaterialImportModule } from './../../material-import/material-import.module';
import { FilesService } from './files.service';
import { NgModule } from '@angular/core';
import { DropZoneDirective } from './drop-zone.directive';
import { FilesListComponent } from './files-list/files-list.component';

@NgModule({
  imports: [MaterialImportModule],
  declarations: [DropZoneDirective, FilesListComponent],
  exports: [DropZoneDirective, FilesListComponent],
  providers: [FilesService]
})
export class FilesModule {}
