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
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  //   console.log(event);
  // if ( "cart" in localStorage){
  //   this.cartProduct=JSON.parse(localStorage.getItem("cart")!)
  //   let exist = this.cartProduct.find(item => item.item.id == event.item.id)
  //   console.log(exist);
  //   if(exist){
  //       alert("product already added in cart")
  //   }else {

  //     this.cartProduct.push(event)
  //     localStorage.setItem("cart",JSON.stringify(this.cartProduct))
  //   }
  // }else {
  //   this.cartProduct.push(event)
  //   localStorage.setItem("cart",JSON.stringify(this.cartProduct))
  // }
  // localStorage.setItem("cart",JSON.stringify(event))



  searchText: string = ''
  onSearchTextChanged(textValue: string) {
    this.searchText = textValue;
    console.log(this.searchText);
  }
}






// if ("cart" in localStorage){
  //    console.log(this.cartProduct
  //   );
  //   console.log(typeof this.cartProduct
  //     );

  //   console.log(event.name)

  //   this.cartProduct=JSON.parse(localStorage.getItem("cart")!)
  //   let exist = this.cartProduct.find(item =>item.id==event.id)
  //   if (exist){
  //     alert("product is already in your cart")
  //   }
  //   else{
  //     this.cartProduct.push(event)
  //     localStorage.setItem( "cart",JSON.stringify(this.cartProduct))
  //   }

  // }
  // else{
  //    this.cartProduct.push(event)
  //    localStorage.setItem( "cart",JSON.stringify(this.cartProduct))

  // }


// }
