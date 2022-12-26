import { Component, OnInit } from '@angular/core';
import { HomeService } from './.././../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  promotedProds: any = []
<<<<<<< HEAD
  newPricedProd:any=[]
  loading:boolean=false
  constructor(private homeServ : HomeService) {

     }
=======
  newPricedProd: any = []
  constructor(private homeServ: HomeService) {

  }
>>>>>>> b270bf5108966ce4b686e208885e37ce133ca33a


  ngOnInit(): void {
    this.loading=true
    this.homeServ.getPromotedProd().subscribe({
<<<<<<< HEAD
      next: (v) =>{
        this.loading=false
        this.promotedProds =v
      },

        error: (e) => {
          this.loading=false
          console.error(e)}
      })
=======
      next: (v) =>
        this.promotedProds = v,

      error: (e) => console.error(e)
    })
>>>>>>> b270bf5108966ce4b686e208885e37ce133ca33a
  }




}

