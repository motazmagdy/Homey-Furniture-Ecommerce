import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartsService } from '../../services/carts.service';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styles: [
  ]
})
export class CartsComponent implements OnInit {
  products: any
  quantity: any
  loading: boolean = false
  constructor(private service: CartsService, private http: HttpClient) { }

  cartProduct: any[] = []
  items: any
  total: any = 0
  success: boolean = false
  cartItems: any
  totalBill: any

  ngOnInit(): void {
    this.getCartProducts()

    this.getCartTotal()

  }

  // if ( "cart" in localStorage){
  //   this.cartProduct=JSON.parse(localStorage.getItem("cart")!)
  // }
  getCartProducts() {
    this.loading = true

    this.service.getAllProductsInCart().subscribe(
      {
        next: (data3: any) => {
          this.loading = false
          console.log(data3)
          this.items = data3
          this.cartItems = data3.items
          console.log(this.cartItems);
          this.totalBill = data3.bill
          console.log(this.total);

        },
        error: (err: any) => {
          this.loading = false
          console.log(err);
        }

      }
    )
    this.getCartTotal()
  }




  addAmount(index: number, productId: any, quantity: any) {

    this.loading = true
    quantity = ++this.cartItems[index].quantity
    var updatedQuantity = { productId, quantity }
    //  console.log(this.cartItems[index].quantity);
    // console.log(updatedQuantity.quantity);

    this.service.modifyOrder(updatedQuantity).subscribe(
      {
        next: (data: any) => {
          this.loading = false

          console.log(data)
          this.totalBill = data.bill
        },

        error: (err: any) => {
          this.loading = false
          console.log(err)
        }

      }
    )

    this.getCartTotal()
  }

  minsAmount(index: number, productId: any, quantity: any) {
    this.loading = true
    quantity = --this.cartItems[index].quantity
    var updatedQuantity = { productId, quantity }
    // console.log(this.cartItems[index].quantity);
    // console.log(updatedQuantity.quantity);
    this.service.modifyOrder(updatedQuantity).subscribe(
      {
        next: (data: any) => {
          this.loading = false
          console.log(data)
          this.totalBill = data.bill
        },

        error: (err: any) => {
          this.loading = false
          console.log(err)
        }
      }
    )
    this.getCartTotal()
  }


  detectChange() {
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProduct))
  }



  deleteProduct(index: number) {
    this.loading = true
    var productId = this.cartItems[index].productId
    console.log(productId);

    this.cartItems.splice(index, 1)
    this.getCartTotal()

    var con = confirm("Are you sure????");
    if (con) {

      this.service.deleteProductFromCart(productId).subscribe(
        {
          next: (data: any) => {
            this.loading = false
            console.log(data)
            this.totalBill = data.bill
          },

          error: (err: any) => {
            this.loading = false
            console.log(err)
          }
        }
      )
      alert("Deleted")
    }
  }

  clearCart() {
    this.cartItems = []
    this.getCartTotal()

    localStorage.setItem("cart", JSON.stringify(this.cartItems))


  }

  getCartTotal() {
    this.total = 0
    // console.log(this.cartItems);

    for (let x in this.cartItems) {
      // console.log(this.cartItems[x].quantity);
      this.total += this.cartItems[x].price * this.cartItems[x].quantity

    }
  }


  /**user cart */
  cart: any = {};
  checkout(): void {
    this.http.post(environment.baseApi + 'order/checkout', {
      items: this.cartItems,
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51MDqJLDqFyEpvR3LR784kOdkUgxLLMvisNt7SSs0DtzUwsjxYg6wnyenhgAVbIlUG40nbEeCBwn4J8GZG1LVBnZy00KVhdBI6h');

      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
