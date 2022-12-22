import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsDetilsComponent } from './components/products-detils/products-detils.component';
import { SearchComponent } from './components/search/search.component';
import { ProductsService } from './services/products.service';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllProductsComponent,
    ProductComponent,
    SearchComponent,
    ProductsDetilsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  providers:[
    ProductsService
  ]
})
export class ProductsModule { }
