import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }

  getAllproductsInCart (){
    return this.http.get('http://localhost:3006/cart')
  }


  modifyOrder(body:any){
    return this.http.put('http://localhost:3006/cart/qmodify' , body)
  }

  deleteProducrFromCart (productId:any){
    return this.http.delete(`http://localhost:3006/cart?productId=${productId}`)
  }


  createnewCart(model:any){
    return this.http.post('http://localhost:3006/cart'+'carts',model)
  }
}
