import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HelpersGuard implements CanActivate {
  constructor(private authService : AuthenticationService , private router : Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.userValue;
    console.log(user);
    if(user){
      // check if route is restricted by role
      const { roles } = route.data;
            console.log(roles)
            console.log(user.role);
            if (roles && !roles.includes(user.role)) {
                console.log('not authorized');
                // role not authorized so redirect to home page
                this.router.navigate(['/error']);
                return false;
            }
            console.log('authorized');
            // authorized so return true
            return true;
          }
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/users/login'])
    }
      return true;
  }
}
  
