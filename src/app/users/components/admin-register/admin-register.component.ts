import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  loading:boolean = false

  constructor(private authenticationService: AuthenticationService ,private _router:Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      image : new FormControl('', Validators.required),
      gender : new FormControl('',Validators.required)
    });
  }

  public onSubmit() {
    if(this.registerForm.get('name')!.value==0||!this.registerForm.controls['email'].valid
     ||!this.registerForm.controls['password'].valid||this.registerForm.get('image')!.value==0){
        alert("Invalid data Can't Be Registered , check the Fields and try again")
    }else{
      this.loading=true
    this.authenticationService.registerAdmin(
      this.registerForm.get('name')!.value,
      this.registerForm.get('email')!.value,
      this.registerForm!.get('password')!.value,
      this.registerForm.get('image')!.value,
      this.registerForm.get('gender')!.value
      ).subscribe(
        {
          next: (res:any) =>{
            this.loading=false
            console.log(res)
            let userInfo = {
              email : res.user.email,
              name : res.user.name,
              id : res.user._id,
              role : res.roleAuth
            }
            localStorage.setItem('token',res.token)
            localStorage.setItem('user',JSON.stringify(userInfo))
            this._router.navigate(['/products/all']);
        },
        error: (e) => {
          this.loading=false
          console.error(e)
    }
  }
    )
  };
}
  get EmailValid(){
    return this.registerForm.controls['email'].valid;
  }
  get EmailField(){
    return this.registerForm!.get('email')!.value
  }
  get PasswordValid(){
    return this.registerForm.controls['password'].valid;
  }
  get PassLength(){
    return this.registerForm!.get('password')!.value
  }
}