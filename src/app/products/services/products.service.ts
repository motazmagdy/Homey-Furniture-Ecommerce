import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http:HttpClient) { }

  getAllproducts(){
    return this.http.get('http://localhost:3006/products/all')
  }

  addingToCart( body:any){
    // console.log(body);
    return this.http.post('http://localhost:3006/cart' , body)
  }

  // getallcategories(){
  //   return this.http.get(' http://localhost:3006/products')
  // }

  getproductById(id:any){
    return this.http.get('http://localhost:3006/products/' +id)
  }
}
