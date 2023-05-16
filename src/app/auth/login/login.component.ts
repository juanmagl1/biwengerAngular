import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb:FormBuilder,private router:Router,
    private auth:AuthService,
    private messageService:MessageService){}
  myForm:FormGroup=this.fb.group({
    username:['',Validators.required],
    password:['',[Validators.required]],
  })

  notValid(campo:string){
    return this.myForm.controls[campo].errors&&
    this.myForm.controls[campo].touched
  }

  login(){
    this.auth.login(this.myForm.value)
    .subscribe(resp=>{
      if (resp)
      this.router.navigate(['/jugadores/mercado'])
      else{
       this.messageService.add({
        severity:'error',
        detail:"Las credenciales son inválidas"
       })
      }
    }
    )
  }
}
