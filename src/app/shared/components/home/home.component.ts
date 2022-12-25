import { Component, OnInit } from '@angular/core';
import { HomeService } from './.././../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  promotedProds: any = []
  newPricedProd: any = []
  constructor(private homeServ: HomeService) {

  }


  ngOnInit(): void {
    this.homeServ.getPromotedProd().subscribe({
      next: (v) =>
        this.promotedProds = v,

      error: (e) => console.error(e)
    })
  }




}

