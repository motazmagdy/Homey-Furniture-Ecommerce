import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/users/services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _authservice : AuthenticationService) { }

  ngOnInit(): void {
    this._authservice.isLoggedIn()
    this._authservice.isUserLoggedIn()
    this._authservice.isAdminLoggedIn()
  }

//   isUserLoggedIn():any{
//       var userInfo = localStorage.getItem('isAdmin')
//       if (userInfo == 'false' ){
//         return true
//       }
//   }

//   isAdminLoggedIn():any{
//     var userInfo = localStorage.getItem('isAdmin')
//     if (userInfo == 'true' ){
//       return true
//     }
// }
}
