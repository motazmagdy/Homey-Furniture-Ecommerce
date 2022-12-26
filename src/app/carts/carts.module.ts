import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsComponent } from './components/carts/carts.component';
import { CartsService } from './services/carts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CartsComponent
  ],
  providers: [
    CartsService
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ]
})
export class CartsModule { }
