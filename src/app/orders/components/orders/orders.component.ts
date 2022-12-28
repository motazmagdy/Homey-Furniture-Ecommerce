import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { OrdersService } from '../../service/orders.service';
import { ProductsService } from '../../../products-crud/services/products.service';

// import { loadStripe } from '@stripe/stripe-js'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: []
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrdersService, private built: FormBuilder, private productsService: ProductsService) { }
  allOrders: any[] = []
  orderDetails: any = {}
  products: any[] = []
  totalItemsInOrder: any[] = []
  totalInEachOrder = 0
  form!: FormGroup

  states = ['pending', 'accepted', 'rejected']

  ngOnInit(): void {
    this.getAllOrders()

    this.form = this.built.group({
      start: [''],
      end: ['']
    });

  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (res: any) => {
        // console.log(res)
        this.allOrders = res
        this.getTotalItemsInOrder()
      },
      error: (err: { message: any }) => { alert(err.message) }
    })
  }

  applyFilter() {
    // console.log(this.form.value)
    let date = this.form.value

    this.orderService.getAllOrders(date).subscribe((res: any) => {
      this.allOrders = res
    })
  }


  viewProductsInOrder(orderId: string) {
    this.products = []
    this.orderService.getOrderById(orderId).subscribe({
      next: (res: any) => {
        this.orderDetails = res;
        this.orderDetails.items
        this.products = this.orderDetails.items
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

  //#region filter by state
  filterByState(event: any) {
    let value: string;
    value = event.target.value;
    (value === "all") ? this.getAllOrders() : this.getSelectedState(value);
  }

  getSelectedState(state: any) {
    this.orderService.getOrdersByState(state).subscribe({
      next: (res: any) => {
        this.allOrders = res
      },
      error: (err: { message: any }) => { alert(err.message) }
    })
  }
  //#endregion filter by state


  modifyOrderState(orderId: string, event: any) {
    this.orderService.updateOrderState(orderId, event.target.value).subscribe({
      next: (res) => { },
      error: (err: { message: any }) => { alert(err.message) }
    })
  }

  //TODO --> in cart component
  /**user cart */
  // cart: any = {};
  // checkout(): void {
  //   this.http.post('http://localhost:3006/order/checkout', {
  //     items: [{
  //       "productId": "63873dc174945547a8c11a6f",
  //       "name": "Writing Desk",
  //       "image": "Writing Desk-1.jpg",
  //       "quantity": 3,
  //       "price": 1099,
  //       "_id": "6397421f4749171ca8ef778f"
  //     }]
  //   }).subscribe(async (res: any) => {
  //     let stripe = await loadStripe('pk_test_51MDqJLDqFyEpvR3LR784kOdkUgxLLMvisNt7SSs0DtzUwsjxYg6wnyenhgAVbIlUG40nbEeCBwn4J8GZG1LVBnZy00KVhdBI6h')
  //     stripe?.redirectToCheckout({
  //       sessionId: res.id
  //     })
  //   })
  // }
}
