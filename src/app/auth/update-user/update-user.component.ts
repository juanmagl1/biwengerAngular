import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Mercado } from 'src/app/jugadores/interfaces/jugadores.component';
import { User, UserResp } from '../interfaces/user.interface';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user!:UserResp;
  usernameId:string|null=localStorage.getItem('username');
  us:any={
    telefono:'',
    pass:'',
    username:'',
    email:'',
    role:'',
    nombre:''
  }

  constructor(private fb:FormBuilder,private router:Router,
    private auth:AuthService,
    private messageService:MessageService){}
  myForm:FormGroup=this.fb.group({
    username:['',Validators.required],
    pass:['',[Validators.required,Validators.minLength(5)]],
    nombre:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    role:['',[Validators.required]],
    telefono:['',[Validators.maxLength(9),Validators.minLength(9)]],
    fotoPerfil:['',],
    fileSource:['']
  })
  

  notValid(campo:string){
    return this.myForm.controls[campo].errors&&
    this.myForm.controls[campo].touched
  }
  ngOnInit(): void {
    if (this.usernameId!==null){
      this.auth.obtenerUsuario(this.usernameId)
      .subscribe({
        next:(usuario)=>{
          this.user=usuario
          this.myForm.setValue({
            telefono: usuario.telefono,
            email:usuario.email,
            username:usuario.username,
            role:usuario.role,
            nombre:usuario.nombre,
            pass:'',
            fotoPerfil:'',
            fileSource:''
          })
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }
  save(){
    this.us.email=this.myForm.value.email
    this.us.telefono=this.myForm.value.telefono
    this.us.pass=this.myForm.value.pass
    this.us.username=this.myForm.value.username
    this.us.role=this.myForm.value.role
    this.us.nombre=this.myForm.value.nombre

    if (this.myForm.get('fileSource')?.value===''){
      this.auth.editarUsuario(this.us.username,this.us)
      .subscribe({
        next:(resp)=>{
          this.messageService.add({
            key:'update',
            severity:'success',
            summary:'Usuario editado'
          })
          this.router.navigate(['/jugadores/mercado'])
        }, error:(err)=>{
          console.log(err);
        }
      })
    }else{
      this.auth.editarUsuarioFoto(this.us.username,this.us,this.myForm.get('fileSource')?.value)
      .subscribe({
        next:(resp)=>{
          this.messageService.add({
            key:'update',
            severity:'success',
            summary:'Usuario editado con foto'
          })
          this.router.navigate(['/jugadores/mercado'])
        }
      })
  }
}


  onFileSelected(event:any){
    if(event.target.files.length>0){
      const file:File = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
    }
    );
  }
}
}
