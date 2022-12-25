import { Component, OnInit } from '@angular/core';
import { HomeService } from './.././../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  promotedProds: any = []
  newPricedProd:any=[]
  loading:boolean=false
  constructor(private homeServ : HomeService) {

     }


  ngOnInit(): void {
    this.loading=true
    this.homeServ.getPromotedProd().subscribe({
      next: (v) =>{
        this.loading=false
        this.promotedProds =v
      },

        error: (e) => {
          this.loading=false
          console.error(e)}
      })
  }




}

