import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  private _profileInfo = "http://localhost:3006/users/profile"
  private _profileUpdate = "http://localhost:3006/users/profile/update"
  private _profileAdminInfo = "http://localhost:3006/admins/profile"


  constructor(private http:HttpClient) { 

  }

  getProfileInfo(){
    return this.http.get(this._profileInfo)
  }
  getAdminProfileInfo(){
    return this.http.get(this._profileAdminInfo)
  }
  updateProfileInfo(id:any , name:any,email:any,password:any,image:any,gender:any){
    var updatedBody = {name,email,password,image,gender}
    return this.http.put(this._profileUpdate,updatedBody)
  }
}
