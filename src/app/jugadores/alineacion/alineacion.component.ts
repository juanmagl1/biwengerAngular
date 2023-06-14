import { Component, OnInit } from '@angular/core';
import { User, UserResp } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { Mercado } from '../interfaces/jugadores.component';
import { JugadoresService } from '../services/jugadores.service';

@Component({
  selector: 'app-alineacion',
  templateUrl: './alineacion.component.html',
  styleUrls: ['./alineacion.component.css']
})
export class AlineacionComponent implements OnInit{
  username:string|null=localStorage.getItem('username')
  usuario!:UserResp
  plantilla!:Mercado[]
  constructor(private service:JugadoresService){}
  ngOnInit(): void {
    if (this.username!=null)
      this.service.devolverAlineacion(this.username)
      .subscribe({
        next:(resp)=>{
          this.plantilla=resp          
        }
      })
  }

}
