import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './productstempl.component.html',
  styleUrls: []
})
export class ProductsComponent implements OnInit {
  allProds: any = []

  constructor(private homeServ: HomeService, private _router: Router) { }


  ngOnInit(): void {
    this.homeServ.getAllProducts().subscribe({
      next: (v) => this.allProds = v,
      error: (e) => {
        if (e instanceof HttpErrorResponse) {
          if (e.status === 401) {
            this._router.navigate(['./login'])
          }
        }
      },
      complete: () => console.info('All products received Successfully')
    })
  }

}
