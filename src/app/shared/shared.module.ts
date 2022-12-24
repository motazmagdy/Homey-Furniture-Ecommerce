import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppComponent } from '../app.component';
import { AppRoutingModule } from '../app-routing.module';
import { SelectComponent } from './components/select/select.component';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ErrorPageComponent,
    HeaderComponent,
    FooterComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SelectComponent
  ],
  bootstrap: [AppComponent]
})
export class SharedModule { }
