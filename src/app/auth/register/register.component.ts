import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb:FormBuilder,private router:Router,
    private auth:AuthService,
    private messageService:MessageService){}
  myForm:FormGroup=this.fb.group({
    username:['',Validators.required],
    pass:['',[Validators.required,Validators.minLength(5)]],
    nombre:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    telefono:['',[Validators.maxLength(9),Validators.minLength(9)]]
  })

  notValid(campo:string){
    return this.myForm.controls[campo].errors&&
    this.myForm.controls[campo].touched
  }

register(){
  console.log(this.myForm.value);
this.auth.register(this.myForm.value)
.subscribe(resp=>{
  console.log(resp)
  if (resp){
  this.router.navigate(['/auth/login'])
}else{
  this.messageService.add({
    key:'register',
    severity:'error',
    detail:"No te has registrado correctamente"
   })
}
})
}
}
