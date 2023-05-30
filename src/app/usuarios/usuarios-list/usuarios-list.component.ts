import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  users!:User[]
constructor(private usuarioService:UsuariosService){}
  ngOnInit(): void {
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
