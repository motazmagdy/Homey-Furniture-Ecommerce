import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

  getAllProductsInCart() {
    return this.http.get(environment.baseApi + 'cart')
  }


  modifyOrder(body: any) {
    return this.http.put(environment.baseApi + 'cart/qmodify', body)
  }

  deleteProductFromCart(productId: any) {
    return this.http.delete(environment.baseApi + `cart?productId=${productId}`)
  }

}
