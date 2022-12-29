import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  private _profileInfo = "http://localhost:3006/users/profile"
  private _profileUpdate = "http://localhost:3006/users/profile/update"
  private _profileAdminInfo = "http://localhost:3006/admins/profile"
  private _userOrders = "http://localhost:3006/order/user/orders"
  private _order = "http://localhost:3006/order/"


  constructor(private http: HttpClient) {

  }

  getProfileInfo() {
    return this.http.get(this._profileInfo)
  }
  getAdminProfileInfo() {
    return this.http.get(this._profileAdminInfo)
  }
  updateProfileInfo(id: any, name: any, email: any, password: any, image: any, gender: any) {
    var updatedBody = { name, email, password, image, gender }
    return this.http.put(this._profileUpdate, updatedBody)
  }


  getUserOrders() {
    return this.http.get(this._userOrders)
  }

  deletePendingOrders(orderId: string) {
    return this.http.delete(this._order + orderId)

  }

  getOrderById(orderId: string) {
    return this.http.get(this._order + orderId)
  }

  getOrdersByState(state: string) {
    return this.http.get(this._order + `state/${state}`)
  }
}
