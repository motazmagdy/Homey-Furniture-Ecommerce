import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProfileServiceService } from './../../services/profile.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  public user: any
  public updateForm!: FormGroup;
  public profileId: any
  loading: boolean = false

  constructor(private _router: Router, private _profileService: ProfileServiceService, private http: HttpClient) {

  }

  ngOnInit() {
    this._profileService.getProfileInfo().subscribe(
      (res: any) => {
        this.user = res.user;
        console.log(res.user)
        this.profileId = res.user._id;
        this.updateForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          image: this.user.image,
          gender: this.user.gender
        })
      }
    )
    this.updateForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      image: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required)
    })


    this.getAllUserOrders()
  }
  get EmailValid() {
    return this.updateForm.controls['email'].valid;
  }
  get EmailField() {
    return this.updateForm!.get('email')!.value
  }
  get PasswordValid() {
    return this.updateForm.controls['password'].valid;
  }
  get PassLength() {
    return this.updateForm!.get('password')!.value
  }
  onSubmit() {
    if (this.updateForm.get('name')!.value == 0 || !this.updateForm.controls['email'].valid
      || !this.updateForm.controls['password'].valid || this.updateForm.get('image')!.value == 0) {
      alert("Invalid data Can't Be Registered , check the Fields and try again")
    } else {
      this.loading = true
      this._profileService.updateProfileInfo(
        this.profileId,
        this.updateForm.get('name')!.value,
        this.updateForm.get('email')!.value,
        this.updateForm!.get('password')!.value,
        this.updateForm.get('image')!.value,
        this.updateForm.get('gender')!.value
      ).subscribe(
        {
          next: (res: any) => {
            this.loading = false
            console.log(res),
              localStorage.setItem('token', res.token)
            this._router.navigate(['/products/all']);
          },
          error: (e) => {
            this.loading = false
            console.error(e)
          }
        }
      )
    }
  }


  allOrders: any[] = []
  totalItemsInOrder: any[] = []
  totalInEachOrder = 0
  products: any[] = []
  orderDetails: any = {}

  states = ['pending', 'accepted', 'rejected']

  getAllUserOrders() {
    this._profileService.getUserOrders().subscribe({
      next: (res: any) => {
        console.log(res)
        this.allOrders = res
        this.getTotalItemsInOrder()
      },
      error: (err: { message: any }) => { alert(err.message) }
    })
  }

  getTotalItemsInOrder() {
    this.allOrders.map((order) => {
      order.items.map((item: any) => {
        this.totalInEachOrder += item.quantity
      })
      this.totalItemsInOrder[order._id] = this.totalInEachOrder
      this.totalInEachOrder = 0
    })
  }

  viewProductsInOrder(orderId: string) {
    this.products = []
    this._profileService.getOrderById(orderId).subscribe({
      next: (res: any) => {
        this.orderDetails = res;
        this.orderDetails.items
        this.products = this.orderDetails.items
      },
      error: (err: { message: any }) => { alert(err.message) }
    })
  }


  filterByState(event: any) {
    let value: string;
    value = event.target.value;
    (value === "all") ? this.getAllUserOrders() : this.getSelectedState(value);
  }

  getSelectedState(state: any) {
    this._profileService.getOrdersByState(state).subscribe({
      next: (res: any) => {
        this.allOrders = res
      },
      error: (err: { message: any }) => { alert(err.message) }
    })
  }

  deleteOrder(order: any) {
    if (order.state === 'pending') {
      this._profileService.deletePendingOrders(order._id).subscribe({
        next: (res: any) => {
          this.getAllUserOrders()
          alert('Order deleted successfully')
        },
        error: (err: { message: any }) => { alert(err.message) }
      })
    } else {
      alert("Sorry, you can delete only pending order")
    }
  }


  // #region image upload
  selectFile(event: any) {
    if (event.target.files.length > 0) {
      const formData = new FormData()
      this.updateForm.get('image')?.setValue(event.target.files[0].name)
      console.log(this.updateForm.value.image)

      formData.append('file', event.target.files[0])

      this.http.post<any>(environment.baseApi + 'file', formData).subscribe({
        next: (res: any) => {
          console.log(res)
        },
        error: (err: { message: any }) => { alert(err.message) }
      })
    }
  }

  // onFileUpload() {
  //   const formData = new FormData()
  //   formData.append('file', this.file)

  //   this.http.post<any>(environment.baseApi + 'file', formData).subscribe({
  //     next: (res: any) => {
  //       console.log(res)
  //       this.displayFile = environment.baseApi + res.path;
  //     },
  //     error: (err: { message: any }) => { alert(err.message) }
  //   })
  // }
  // #endregion image upload

}
