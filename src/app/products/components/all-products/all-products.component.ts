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
  loading:boolean = false

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this.loading = true
    this.productsService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res
        this.loading = false
      },
      error: (err: { message: any; }) => {
        this.loading = false
        alert(err.message) }
    })

  }

  //#region filter by category
  filterByCategory(event: any) {
    let value = event.target.value;
    (value === "all") ? this.getAllProducts() : this.getProductsCategory(value);
  }

  getProductsCategory(keyword: string) {
    this.loading = true
    this.productsService.getProductsByCategory(keyword).subscribe({
      next: (res: any) => {
        this.products = res
        this.loading = false
      },
      error: (err: { message: any }) => {
        this.loading = false
        alert(err.message) }
    })
  }
  //#endregion filter by category


  // addToCart(event:any){
  addToCart(orderData: object) {
    console.log(orderData);
    this.loading = true
    this.productsService.addingToCart(orderData).subscribe(
      {
        next: (data) => {
          this.loading = false
          console.log(data) },
        error: (err) => {
          this.loading = false
          console.log(err);
        }
      }
    )
  }

  searchText: string = ''
  onSearchTextChanged(textValue: string) {
    this.searchText = textValue;
    console.log(this.searchText);
  }
}
