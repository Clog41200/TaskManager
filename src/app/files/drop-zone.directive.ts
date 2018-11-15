import { File, FilesService } from './files.service';
import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {
  constructor(el: ElementRef, private filesservice: FilesService) { }

  @Output() onFileSaved = new EventEmitter<File>();

  @HostListener('drop', ['$event'])
  onDrop(event) {

    const nomFichier = event.dataTransfer.files[0].name;
    const reader = new FileReader();
    reader.onloadend = (ev) => {

      const file = new File();
      file.filename = nomFichier;
      file.data = (ev.target as any).result;

      this.filesservice.Add(file).then((id) => {
        file.id = id;
        this.onFileSaved.emit(file);
      });
    };
    reader.readAsDataURL(event.dataTransfer.files[0]);

  }

  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }
}
