import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {
  @Input()  data: any = {};
  @Input()
  addedToWishlist!: boolean;
  @Output() item = new EventEmitter()
  addButton: boolean = false;
  amount: number = 0;
  // productItem: any;
  // wishList2:any=[]

  constructor(private productService : ProductsService) { }

  ngOnInit(): void {

  }
  add() {
    this.item.emit({
      productId: this.data._id,
      quantity: this.amount

    })
  }


handleAddToWishlist () {
  console.log(this.data._id);

this.productService.addToWishlist(this.data._id).subscribe(() => {
  this.addedToWishlist = true;
})
}

handleRemoveFromWishlist () {
this.productService.removeFromWishlist(this.data._id).subscribe(() => {
  this.addedToWishlist = false;
})
}
}
