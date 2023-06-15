import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../services/jugadores.service';
import { Mercado } from '../interfaces/jugadores.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-all-jugadores',
  templateUrl: './list-all-jugadores.component.html',
  styleUrls: ['./list-all-jugadores.component.css']
})
export class ListAllJugadoresComponent implements OnInit {
  jugador!:Mercado[]
  constructor(private jugadores:JugadoresService){}
  ngOnInit(): void {
    this.jugadores.obtenerTodosJugadores()
    .subscribe({
      next:(value)=>{
        this.jugador=value
      }
    })
  }
borrarJugador(id:number){
  Swal.fire({
    title: '¿Quieres borrar a este Jugador?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.isConfirmed) {
      this.jugadores.borrarJugador(id)
      .subscribe({
        next:(resp)=>{
        this.jugador=this.jugador.filter(item=>item.id!=resp.id)
    }
  })
    }

  })
  
}
}
