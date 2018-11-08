import { PostgresqlService } from './postgresql.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EtatsService {
  constructor(private pg: PostgresqlService) {}

  /**
   * Retourne tout les états selon l'ordre préférentiel.
   */
  GetAll(): Promise<Array<Etat>> {
    return this.pg.Query('select * from etat order by ordre asc');
  }

  Delete(etat: Etat): Promise<void> {
    return this.pg.Query('delete from etat where id=$1', [etat.id]);
  }

  /** Ajout un nouvelle état, l'ordre sera mis automatiquement au plus élevé
   * */
  Add(etat: Etat): Promise<number> {
    return new Promise((res, rej) => {
      this.pg.Query('select count(*) as nb from etat').then(resu => {
        etat.ordre = resu[0].nb;
        this.pg
          .Query(
            'insert into etat (libelle,ordre) values ($1,$2) returning id',
            [etat.libelle, etat.ordre]
          )
          .then(resultat => {
            res(resultat[0].id);
          });
      });
    });
  }

  Update(etat: Etat): Promise<void> {
    return this.pg.Query('update etat set libelle=$1, ordre=$2 where id=$3', [
      etat.libelle,
      etat.ordre,
      etat.id
    ]);
  }
}

export class Etat {
  public id: number;
  public ordre: number;
  public libelle: string;

  constructor() {
    this.id = 0;
    this.ordre = 0;
    this.libelle = '';
  }
}
