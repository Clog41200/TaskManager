import { Component, OnInit } from '@angular/core';
import { Rights, RightsService } from '../rights.service';

@Component({
  selector: 'app-rights-managment',
  templateUrl: './rights-managment.component.html',
  styleUrls: ['./rights-managment.component.css']
})
export class RightsManagmentComponent implements OnInit {
  public rights: Array<Rights>;

  constructor(private rightsService: RightsService) {}

  ngOnInit() {
    this.rightsService.GetAll().then(res => {
      this.rights = res;
    });
  }
}
