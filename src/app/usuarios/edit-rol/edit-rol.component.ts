import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html'
})
export class EditRolComponent implements OnInit {
  username:string=this.route.snapshot.params['username'];
  myForm: FormGroup = this.fb.group({
   role:['']
  })
constructor(private usu:UsuariosService,
  private auth:AuthService,
  private fb: FormBuilder,
  private router:Router,
  private route:ActivatedRoute){}
  ngOnInit(): void {
    this.auth.obtenerUsuario(this.username)
    .subscribe({
      next:(resp)=>{
        this.myForm.setValue({
          role:resp.role
        })
      }
    })
  }
  editarUsuarios(){
    if (this.username!=null)
      this.usu.editRol(this.username,this.myForm.value)
      .subscribe({
        next:(resp)=>{
          this.router.navigate(['/usuarios/accion'])
        }
      })
  }
}
