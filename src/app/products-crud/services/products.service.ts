import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }
  getAllProducts() {
    return this.http.get(environment.baseApi + 'products/all')
  }

  getProductsByCategory(keyword: string) {
    return this.http.get(environment.baseApi + 'products/category/' + keyword)
  }

  getProductById(id: any) {
    return this.http.get(environment.baseApi + 'products/' + id)
  }

  addNewProduct(newProduct: any) {
    return this.http.post(environment.baseApi + 'products/newProduct', newProduct)
  }

  updateProductById(productId: string, updatedProduct: any) {
    return this.http.put(environment.baseApi + `products/${productId}`, updatedProduct)
  }

  deleteProductById(id: string) {
    return this.http.delete(environment.baseApi + `products/${id}`)
  }

  uploadFile(formData: any) {
    return this.http.post<any>(environment.baseApi + 'file/multiple', formData)
  }
}
