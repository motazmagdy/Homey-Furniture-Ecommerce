import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './.././../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminLoginComponent implements OnInit {
  public loginForm!: FormGroup;
  loading:boolean=false

  constructor(private authenticationService: AuthenticationService , private _router:Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }
  public onSubmit() {
    if(!this.loginForm.controls['email'].valid){
      alert("Invalid data , check the Fields and try again")
  }else{
    this.loading=true
    this.authenticationService.loginAdmin(
      this.loginForm.get('email')!.value,
      this.loginForm!.get('password')!.value)
      .subscribe({
        next: (res:any) => {
          this.loading=false
          console.log(res.status),
          localStorage.setItem('token',res.token),
          this._router.navigate(['/products/all']);
        },
        error: (e) => {
          this.loading=false
          let eStat= JSON.stringify(e.status)
          alert(`Wrong email or password , check the fields and try again . Error status ${eStat}`)
          console.error(e);
        }
      })
  }}
  get EmailValid(){
    return this.loginForm.controls['email'].valid;
  }
  get EmailField(){
    return this.loginForm!.get('email')!.value
  }

}
