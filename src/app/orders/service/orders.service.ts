import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getAllOrders(myParams?: any) {
    // console.log(myParams?.start, myParams?.end)
    const startDate = myParams?.start
    const endDate = myParams?.end
    return this.http.get(environment.baseApi + `order/all?startDate=${startDate ? startDate : '2022-1-1'}&endDate=${endDate ? endDate : '3000-1-1'}`)
  }

  getOrderById(id: string) {
    return this.http.get(environment.baseApi + 'order/' + id)
  }

  deleteOrder(id: string) {
    return this.http.delete(environment.baseApi + 'order/' + id)
  }

  getOrdersByState(state: string) {
    return this.http.get(environment.baseApi + `order/state/${state}`)
  }

  updateOrderState(orderId: string, state: string) {
    let body = { state }
    return this.http.put<any>(environment.baseApi + `order/${orderId}`, body)
  }
}
