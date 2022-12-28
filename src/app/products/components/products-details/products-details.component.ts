import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  data: any = {};

  loading: boolean = false


  addButton: boolean = false;
  amount: number = 0;

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.loading = true
    this.productsService.getProductById(this.id).subscribe(res => {
      this.loading = false
      this.data = res
      console.log(this.data)
    })
  }

  // add() {
  //   this.item.emit({
  //     //  userId:localStorage.getItem('user'),
  //     productId: this.data._id,
  //     quantity: this.amount

  //   })
  // }

  addToCart() {
    console.log(this.data);

    let orderData = { productId: this.data._id, quantity: this.amount }

    this.productsService.addingToCart(orderData).subscribe(
      {
        next: (data) => { console.log(data) },
        error: (err) => { console.log(err); }
      }
    )
  }


  selectedIndex = 0

  selectImage(index: number) {
    this.selectedIndex = index
  }


}
