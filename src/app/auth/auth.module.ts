import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UpdateUserComponent } from './update-user/update-user.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ToastModule
    
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    UpdateUserComponent
  ],
  providers:[
    MessageService
  ]
})
export class AuthModule { }
