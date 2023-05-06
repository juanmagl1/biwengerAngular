import { JugadoresService } from './services/jugadores.service';
import { Component, OnInit } from '@angular/core';
import { Mercado } from './interfaces/jugadores.component';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
  mercado!:Mercado[]
  posiciones!:string[]
  input!:string
  constructor(private servicioMercado:JugadoresService){}
  ngOnInit(): void {
  this.cargarPosiciones()
  this.cargarDatosJugadores()
  }

  cargarDatosJugadores(){
    this.servicioMercado.mercado()
    .subscribe({
     next:(resp)=>{
       this.mercado=resp
       console.log(resp);
       
     },error:(err)=>{
       console.log(err);
       
     }
    })
  }

  cargarPosiciones(){
    this.servicioMercado.posiciones()
    .subscribe({
      next:(resp)=>{
        this.posiciones=resp
      }
    })
  }
  filtrarPorPosicion(){

      this.servicioMercado.filtradoPorPosicion(this.input)
      .subscribe({
        next:(resp)=>{
          this.mercado=resp
        },error:(err)=>{
          console.log(err);
        }
      })
  }
}
