import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  users!:User[]
  role!:string;
constructor(private usuarioService:UsuariosService,private auth:AuthService){}
  ngOnInit(): void {
    this.role=this.auth.role
    this.usuarioService.usuariosOrdenados()
    .subscribe({
      next:(resp)=>{
        this.users = resp
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
