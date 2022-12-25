import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsCRUDComponent } from './components/all-products-crud/all-products-crud.component';
import { ProductComponent } from './components/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AllProductsCRUDComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    SharedModule
  ],
  exports: [
    AllProductsCRUDComponent,
    ProductComponent,
  ]
})
export class ProductsCRUDModule { }
