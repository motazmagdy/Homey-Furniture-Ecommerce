import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _registerUrl = "http://localhost:3006/users/signup"
  private _registerAdminUrl = "http://localhost:3006/admins/newAdmin"
  private _loginUrl = "http://localhost:3006/users/login"
  private _loginAdminUrl = "http://localhost:3006/admins/login"
  private tokenKey ='token';
  private userSubject: BehaviorSubject<any>;
  public  user: Observable<User | null>;
  private userLSt = 'user'
  public  userInfo:any

  constructor(private http:HttpClient,private router : Router) { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
    
}

public get userValue(){
return this.userSubject.value;
}

public login(email:string,password:string) {
     return this.http.post(this._loginUrl,{email,password})
  }

public loginAdmin(email:string,password:string) {
    return this.http.post(this._loginAdminUrl,{email,password})
 }




public register(name:string,email:string,password:string,image:string,gender:string) {
  return this.http.post(this._registerUrl,{name,email,password,image,gender})
  }

public registerAdmin(name:string,email:string,password:string,image:string,gender:string) {
    return this.http.post(this._registerAdminUrl,{name,email,password,image,gender})
    }
  
    public logout(){
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userLSt);
      this.router.navigate(['users/login'])
    }
    
    public isLoggedIn(): boolean {
      return !!localStorage.getItem(this.tokenKey)
    }
    
    public isUserLoggedIn():any{
      if(this.isLoggedIn()){
        if (this.userSubject.value.role == 'user' ){
          return true
        }
      }
    }
    
    public isAdminLoggedIn():any{
      if(this.isLoggedIn()){
        if (this.userSubject.value.role == 'admin' ){
          return true
        }
      }
    }
    
public getToken():string | null {
  return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
}
}