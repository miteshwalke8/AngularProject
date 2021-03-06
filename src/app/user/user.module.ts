
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
     { path: 'sign-up', component: SignupComponent },
     { path: 'login', component: LoginComponent },
      { path: '', component: UserComponent }
    ])
  ],
  // exports: [
  //   SignupComponent,
  //   LoginComponent,
  //   ForgetPasswordComponent,
  //   SharedModule,
  //   ResetPasswordComponent,
  //   UserComponent

  // ],
  declarations: [SignupComponent, LoginComponent, UserComponent]})
export class UserModule { }