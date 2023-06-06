import { Component, OnInit } from '@angular/core';
import { Mercado } from '../interfaces/jugadores.component';
import { JugadoresService } from '../services/jugadores.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit{
  username:string|null="";
  plantilla!:Mercado[];
  constructor(private jugadorService:JugadoresService,
  private messageService: MessageService ){}
  ngOnInit(): void {
    this.username=localStorage.getItem('username');
    this.jugadorService.equipo(this.username||"")
    .subscribe({
      next:(resp)=>{
        this.plantilla=resp;
      },error(err) {
        console.log(err);
      },
    })
  }

  venderJugador(id:number){
    Swal.fire({
      title: '¿Quieres vender a este jugador?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.jugadorService.venderJugador(id)
        .subscribe({
          next:(jugador)=>{
            this.messageService.add({
              key:'equipo',
              severity:'success',
              detail:"Jugador vendido"
            })
            this.plantilla=this.plantilla.filter(item=>item.id!=jugador.id);
          }
        })
      }

    })
}
}
