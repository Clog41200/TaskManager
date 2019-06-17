import { Component, OnInit } from '@angular/core';
import { PostgresqlService } from 'src/app/postgresql.service';

@Component({
  selector: 'main-front',
  templateUrl: './main-front.component.html',
  styleUrls: ['./main-front.component.css']
})
export class MainFrontComponent implements OnInit {
  public hierarchy: Array<any>;
  public nouveauNom: String;

  constructor(private pg: PostgresqlService) {
    this.hierarchy = [];
    this.nouveauNom = '';
  }

  ngOnInit() {
    this.pg
      .Query('select * from proc_hierarchy order by ordre asc')
      .then(results => {
        this.hierarchy = results;
      });
  }

  public ajouterRubrique() {
    this.pg
      .Query('insert into proc_hierarchy (libelle) values($1)', [
        this.nouveauNom
      ])
      .then(() => {
        this.ngOnInit();
      });
  }
}
