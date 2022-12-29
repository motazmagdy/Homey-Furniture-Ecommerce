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
  cart: any
  total: any = 0
  success: boolean = false
  cartItems: any
  totalBill: any

  ngOnInit(): void {
    this.getCartProducts()

    this.getCartTotal()

  }

  getCartProducts() {
    this.loading = true

    this.service.getAllProductsInCart().subscribe(
      {
        next: (res: any) => {
          this.loading = false
          this.cart = res
          if (this.cart) {
            this.cartItems = res.items
            this.totalBill = res.bill
          }
        },
        error: (err: { message: any }) => {
          this.loading = false
          alert(err.message);
        }

      }
    )
    this.getCartTotal()
  }


  addAmount(index: number, productId: any, quantity: any) {
    this.loading = true
    quantity = ++this.cartItems[index].quantity
    var updatedQuantity = { productId, quantity }

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

    for (let x in this.cartItems) {
      this.total += this.cartItems[x].price * this.cartItems[x].quantity
    }
  }


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
