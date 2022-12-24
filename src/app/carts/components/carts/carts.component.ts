import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styles: [
  ]
})
export class CartsComponent implements OnInit {
  products: any
  quantity: any
  constructor(private service: CartsService) { }
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
    console.log("hhhh");
    this.service.getAllProductsInCart().subscribe(
      {
        next: (data3: any) => {
          console.log(data3)
          this.items = data3
          this.cartItems = data3.items
          console.log(this.cartItems);
          this.totalBill = data3.bill
          console.log(this.total);

        },
        error: (err: any) => {
          console.log(err);
        }

      }
    )
    this.getCartTotal()
  }




  addAmount(index: number, productId: any, quantity: any) {


    quantity = ++this.cartItems[index].quantity
    var updatedQuantity = { productId, quantity }
    //  console.log(this.cartItems[index].quantity);
    // console.log(updatedQuantity.quantity);

    this.service.modifyOrder(updatedQuantity).subscribe(
      {
        next: (data: any) => {
          console.log(data)
          this.totalBill = data.bill
        },

        error: (err: any) => { console.log(err) }

      }
    )

    this.getCartTotal()
  }

  minsAmount(index: number, productId: any, quantity: any) {
    quantity = --this.cartItems[index].quantity
    var updatedQuantity = { productId, quantity }
    // console.log(this.cartItems[index].quantity);
    // console.log(updatedQuantity.quantity);
    this.service.modifyOrder(updatedQuantity).subscribe(
      {
        next: (data: any) => {
          console.log(data)
          this.totalBill = data.bill
        },

        error: (err: any) => { console.log(err) }

      }

    )
    this.getCartTotal()

  }


  detectChange() {
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProduct))
  }



  deleteProduct(index: number) {
    var productId = this.cartItems[index].productId
    console.log(productId);

    this.cartItems.splice(index, 1)
    this.getCartTotal()

    var con = confirm("Are you sure????");
    if (con) {
      this.service.deleteProductFromCart(productId).subscribe(
        {
          next: (data: any) => {
            console.log(data)
            this.totalBill = data.bill
          },

          error: (err: any) => { console.log(err) }

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

}
