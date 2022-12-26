import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsComponent } from './components/carts/carts.component';
import { CartsService } from './services/carts.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";



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
        SharedModule
    ]
})
export class CartsModule { }
