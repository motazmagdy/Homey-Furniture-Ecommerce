import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { SearchComponent } from './components/search/search.component';
import { ProductsService } from './services/products.service';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AllProductsComponent,
    ProductComponent,
    SearchComponent,
    ProductsDetailsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
