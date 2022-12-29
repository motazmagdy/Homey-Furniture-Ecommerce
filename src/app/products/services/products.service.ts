import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(environment.baseApi + 'products/user/all-products')
  }

  getProductsByCategory(keyword: string) {
    return this.http.get(environment.baseApi + 'products/category/' + keyword)
  }

  addingToCart(body: any) {
    return this.http.post(environment.baseApi + 'cart', body)
  }

  getProductById(id: any) {
    return this.http.get(environment.baseApi + 'products/' + id)
  }
  getWishlist(){
   return this.http.get(environment.baseApi  + 'favorites').pipe(
   map((result:any=[])=>{
    console.log(result);
  let productIds: any[] = []
  let wishItems = result.items
  console.log(wishItems);
  wishItems.forEach((item: { productId: any; })=> productIds.push(item.productId))
    return productIds;
   })

   )
  }

  addToWishlist(productId: any){
  return this.http.post(environment.baseApi +'favorites' , {_id:productId})
  }

  removeFromWishlist(productId: any){
    // return this.http.delete(environment.baseApi + 'favorites/' + productId)
    return this.http.delete(environment.baseApi + `favorites/?productId=${productId}`)
  }
}
