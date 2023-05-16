import { JugadoresService } from './services/jugadores.service';
import { Component, OnInit } from '@angular/core';
import { Mercado, Posicion } from './interfaces/jugadores.component';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
  mercado!:Mercado[]
  posiciones!:string[]
  input!:string
  nombre!:string
  boton:boolean=false
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
     },error:(err)=>{
       console.log(err);
       
     }
    })
  }
  ocultarBoton(){
    this.boton=!this.boton
    
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

  filtrarPorNombre(){
    this.mercado=[]
    if (this.nombre===undefined){
      this.filtrarPorPosicion()
    }else {
      console.log(this.nombre);
      this.servicioMercado.filtradoPorNombre(this.nombre)
      .subscribe({
        next:(resp)=>{
          console.log("gola");
          if (resp.length===0){
            this.mercado=resp
          }else{
            for (let i=0;i<resp.length;i++){
              if (resp[i].posicion===this.input){
                  this.mercado.push(resp[i])
              }
             }
          }
          console.log(this.mercado);
        },error:(err)=>{
          console.log(err);
        }
      })
    }
  }
}
