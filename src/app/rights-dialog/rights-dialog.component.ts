import { FormGroup, FormControl } from '@angular/forms';
import { Rights, RightsService } from './../rights.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-rights-dialog',
  templateUrl: './rights-dialog.component.html',
  styleUrls: ['./rights-dialog.component.css']
})
export class RightsDialogComponent implements OnInit {
  public form = new FormGroup({
    label: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<RightsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rights,
    public rightServices: RightsService
  ) {}

  ngOnInit() {
    this.form.patchValue({ label: this.data.label });
  }

  onSubmit() {
    this.data.label = this.form.value.label;
    if (this.data.id === 0) {
      this.rightServices.Add(this.data).then(() => {
        this.dialogRef.close('ok');
      });
    } else {
      this.rightServices.Update(this.data).then(() => {
        this.dialogRef.close('ok');
      });
    }
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
