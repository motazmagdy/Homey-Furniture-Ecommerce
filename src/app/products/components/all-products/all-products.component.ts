import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styles: [
  ]
})
export class AllProductsComponent implements OnInit {

  productId:any
  quantity:any
  products:any
  categories:any
  cartproduct:any[]=[]
  body2: any;

  constructor( private service:ProductsService) { }

  ngOnInit(): void {
    this.service.getAllproducts().subscribe(
    {
      next:(data: any)=>{this.products=data},
      error:(err: { message: any; })=>{alert(err.message)}
    }
  )
  
  }
  // this.service.getallcategories().subscribe(
  //   {
  //     next:(data)=>{this.products=data},
  //     error:(err)=>{alert(err.message)}
  //   }
  // )
    

    // addtocart(event:any){
      
    addtocart(orderData:object){
      console.log(orderData);
        this.service.addingToCart(orderData).subscribe(
          {
            next:(data)=>{console.log(data)},
            error:(err)=>{console.log(err);
            }
          }
         )
        }

    //   console.log(event);
    // if ( "cart" in localStorage){
    //   this.cartproduct=JSON.parse(localStorage.getItem("cart")!)
    //   let exist = this.cartproduct.find(item => item.item.id == event.item.id)
    //   console.log(exist);
    //   if(exist){
    //       alert("product already added in cart")
    //   }else {

    //     this.cartproduct.push(event)
    //     localStorage.setItem("cart",JSON.stringify(this.cartproduct))
    //   }
    // }else {
    //   this.cartproduct.push(event)
    //   localStorage.setItem("cart",JSON.stringify(this.cartproduct))
    // }
      // localStorage.setItem("cart",JSON.stringify(event))



searchText : string=''
onSearchTextChanged(textValue: string){
  this.searchText = textValue;
  console.log(this.searchText);
}
}






// if ("cart" in localStorage){
  //    console.log(this.cartproduct
  //   );
  //   console.log(typeof this.cartproduct
  //     );

  //   console.log(event.name)

  //   this.cartproduct=JSON.parse(localStorage.getItem("cart")!)
  //   let exist = this.cartproduct.find(item =>item.id==event.id)
  //   if (exist){
  //     alert("product is already in your cart")
  //   }
  //   else{
  //     this.cartproduct.push(event)
  //     localStorage.setItem( "cart",JSON.stringify(this.cartproduct))
  //   }

  // }
  // else{
  //    this.cartproduct.push(event)
  //    localStorage.setItem( "cart",JSON.stringify(this.cartproduct))

  // }


// }
