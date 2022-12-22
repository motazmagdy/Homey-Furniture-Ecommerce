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
  }

}
