import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../services/jugadores.service';
import { Mercado } from '../interfaces/jugadores.component';

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
  this.jugadores.borrarJugador(id)
  .subscribe({
    next:(resp)=>{
      this.jugador=this.jugador.filter(item=>item.id!=resp.id)
    }
  })
}
}
