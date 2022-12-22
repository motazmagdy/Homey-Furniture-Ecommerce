import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private _promotedProd = "http://localhost:3006/products/promotions"
  private _allProd = "http://localhost:3006/products/all"
  constructor(private http:HttpClient) { }

  getPromotedProd(){
    return this.http.get(this._promotedProd)
  }

  getAllProducts(){
    return this.http.get(this._allProd)
  }
}
