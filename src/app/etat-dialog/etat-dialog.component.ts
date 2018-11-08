import { FormGroup, FormControl } from '@angular/forms';
import { EtatsService, Etat } from './../etats.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-etat-dialog',
  templateUrl: './etat-dialog.component.html',
  styleUrls: ['./etat-dialog.component.css']
})
export class EtatDialogComponent implements OnInit {
  public form = new FormGroup({
    libelle: new FormControl('')
  });
  constructor(
    public dialogRef: MatDialogRef<EtatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Etat,
    public etatService: EtatsService
  ) {}

  ngOnInit() {
    if (this.data.id !== 0) {
      this.form.patchValue({
        libelle: this.data.libelle
      });
    }
  }

  onSubmit() {
    this.data.libelle = this.form.value.libelle;

    if (this.data.id === 0) {
      this.etatService.Add(this.data).then(() => {
        this.dialogRef.close('update');
      });
    } else {
      this.etatService.Update(this.data).then(() => {
        this.dialogRef.close('update');
      });
    }
  }
}
