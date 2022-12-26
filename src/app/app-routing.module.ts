import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpersGuard } from './../app/users/services/helpers.guard';
import { LoginPageComponent } from './users/components/login-page/login-page.component';
import { RegisterPageComponent } from './users/components/register-page/register-page.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { HomeComponent } from './shared/components/home/home.component';
import { AboutComponent } from './shared/components/about/about.component';
import { AdminLoginComponent } from './users/components/admin-login/admin-login.component';
import { AdminRegisterComponent } from './users/components/admin-register/admin-register.component';
import { ProfileViewComponent } from './users/components/profile-view/profile-view.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { CartsComponent } from './carts/components/carts/carts.component';

import { AllProductsCRUDComponent } from './products-crud/components/all-products-crud/all-products-crud.component';
import { OrdersComponent } from './orders/components/orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'admins/login', component: AdminLoginComponent },
  { path: 'admins/register', component: AdminRegisterComponent },
  { path: 'users/login', component: LoginPageComponent },
  { path: 'users/register', component: RegisterPageComponent },
  { path: 'users/profile', component: ProfileViewComponent, canActivate: [HelpersGuard] },

  { path: 'products/crud', component: AllProductsCRUDComponent, canActivate: [HelpersGuard] },
  { path: 'admins/orders', component: OrdersComponent, canActivate: [HelpersGuard] },

  { path: 'products/all', component: AllProductsComponent, canActivate: [HelpersGuard] },
  { path: 'products/:id', component: ProductsDetailsComponent, canActivate: [HelpersGuard] },
  { path: 'users/carts', component: CartsComponent, canActivate: [HelpersGuard] },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
