import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { HelpersGuard } from './services/helpers.guard';
import { TokenInterceptor } from './services/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        LoginPageComponent,
        RegisterPageComponent,
        AdminLoginComponent,
        AdminRegisterComponent,
        ProfileViewComponent
    ],
    providers: [
        HelpersGuard,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatTabsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        SharedModule
    ]
})
export class UsersModule { }
