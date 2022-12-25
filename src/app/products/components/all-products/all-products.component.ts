import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styles: [
  ]
})
export class AllProductsComponent implements OnInit {

  productId: any
  quantity: any
  products: any
  categories: any = [
    "dinning-room",
    "bed-room",
    "living-room",
    "sofas",
    "office",
    "chairs"
  ];
  cartProduct: any[] = []
  body2: any;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res
      },
      error: (err: { message: any; }) => { alert(err.message) }
    })

  }

  //#region filter by category
  filterByCategory(event: any) {
    let value = event.target.value;
    (value === "all") ? this.getAllProducts() : this.getProductsCategory(value);
  }

  getProductsCategory(keyword: string) {
    this.productsService.getProductsByCategory(keyword).subscribe({
      next: (res: any) => {
        this.products = res
      },
      error: (err: { message: any }) => { alert(err.message) }
    })
  }
  //#endregion filter by category


  // addToCart(event:any){
  addToCart(orderData: object) {
    console.log(orderData);
    this.productsService.addingToCart(orderData).subscribe(
      {
        next: (data) => { console.log(data) },
        error: (err) => { console.log(err); }
      }
    )
  }

  searchText: string = ''
  onSearchTextChanged(textValue: string) {
    this.searchText = textValue;
    console.log(this.searchText);
  }
}
