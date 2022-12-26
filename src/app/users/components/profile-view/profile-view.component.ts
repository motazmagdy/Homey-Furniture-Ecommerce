import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileServiceService } from './../../services/profile.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  public user :any
  public updateForm! : FormGroup;
  public profileId :any
  loading:boolean = false

  constructor(private _router:Router,private _profileService : ProfileServiceService ) {

  }

  ngOnInit() {
      this._profileService.getProfileInfo().subscribe(
        (res:any) => {
          this.user = res.user;
          this.profileId = res.user._id;
          this.updateForm.patchValue({
              name:this.user.name,
              email:this.user.email,
              password:this.user.password,
              image:this.user.image,
              gender:this.user.gender
          })
        }
      )
      this.updateForm = new FormGroup({
        name:new FormControl('',Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required,Validators.minLength(8)]),
        image : new FormControl('', Validators.required),
        gender : new FormControl('',Validators.required)
      })
  }
  get EmailValid(){
    return this.updateForm.controls['email'].valid;
  }
  get EmailField(){
    return this.updateForm!.get('email')!.value
  }
  get PasswordValid(){
    return this.updateForm.controls['password'].valid;
  }
  get PassLength(){
    return this.updateForm!.get('password')!.value
  }
onSubmit(){
  if(this.updateForm.get('name')!.value==0||!this.updateForm.controls['email'].valid
     ||!this.updateForm.controls['password'].valid||this.updateForm.get('image')!.value==0){
        alert("Invalid data Can't Be Registered , check the Fields and try again")
    }else{
      this.loading=true
    this._profileService.updateProfileInfo(
      this.profileId,
      this.updateForm.get('name')!.value,
      this.updateForm.get('email')!.value,
      this.updateForm!.get('password')!.value,
      this.updateForm.get('image')!.value,
      this.updateForm.get('gender')!.value
      ).subscribe(
        {
          next: (res:any) =>{
            this.loading=false
            console.log(res),
            localStorage.setItem('token',res.token)
            this._router.navigate(['/products/all']);
        },
        error: (e) => {
          this.loading=false
          console.error(e)
         }
     }
    )}
}
}
