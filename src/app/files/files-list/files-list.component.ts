import { File, FilesService } from './../files.service';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/tasks.service';

@Component({
  selector: 'files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit {
  protected piecesJointes: MatTableDataSource<File>;

  @Input() task: Task;

  constructor(private fileservice: FilesService) {
    this.piecesJointes = new MatTableDataSource<File>();
  }

  /**
   * Permet de rafraichir la liste des fichiers.
   */
  public Refresh() {
    this.fileservice
      .GetAllWithoutData()
      .then(res => (this.piecesJointes.data = res));
  }

  ngOnInit() {
    this.Refresh();
  }

  protected ouvrirFichier(file: File) {
    this.fileservice.open(file);
  }

  protected supprimerFichier(file: File) {
    this.fileservice.Delete(file).then(() => {
      this.piecesJointes.data.splice(
        this.piecesJointes.data.findIndex(fichier => fichier.id === file.id),
        1
      );
      this.piecesJointes.data = this.piecesJointes.data;
    });
  }
}
