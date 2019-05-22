import { ConnexionService } from './../connexion.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostgresqlService } from '../postgresql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  initform = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  public showError = false;
  public messageErreur = '';

  constructor(
    private pg: PostgresqlService,
    private zone: NgZone,
    private router: Router,
    private connexionService: ConnexionService
  ) {}

  ngOnInit() {

  }

  submit() {
    this.connexionService
      .Connexion(this.initform.value.login, this.initform.value.password)
      .then(res => {
        if (res === undefined) {
          this.showError = true;
          this.messageErreur = 'Login incorrecte.';
          setTimeout(() => {
            this.zone.run(() => {
              this.showError = false;
            });
          }, 4000);
        } else {
          this.connexionService.user = res;

          localStorage.setItem('user', JSON.stringify(res));

          this.connexionService.GetRights();

          this.router.navigate(['/main']);

        }
      });
  }
}
