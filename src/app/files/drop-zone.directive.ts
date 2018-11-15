import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {
  constructor(el: ElementRef) {}

  @HostListener('drop', ['$event'])
  onDrop(event) {
    const reader = new FileReader();
    reader.onloadend = (ev: any) => {
      // ev.target.result;
    };
    reader.readAsArrayBuffer(event.dataTransfer.files[0]);
    console.log(event.dataTransfer.files[0]);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }
}
