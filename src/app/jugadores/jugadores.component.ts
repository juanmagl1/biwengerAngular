import { JugadoresService } from './services/jugadores.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Mercado, Posicion } from './interfaces/jugadores.component';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
  providers:[
    MessageService
  ]
})
export class JugadoresComponent implements OnInit {
  mercado!:Mercado[]
  posiciones!:string[]
  input!:string
  nombre!:string
  username!:string|null;
  boton:boolean=false
  constructor(private servicioMercado:JugadoresService,
  private messageService:MessageService){}
  ngOnInit(): void {
  this.cargarPosiciones()
  this.cargarDatosJugadores()
  this.username=localStorage.getItem('username')
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

  comprarJugadores(id:number){
    console.log("ha entrado");
      this.servicioMercado.comprarJugador(id)
    .subscribe({
      next:(jugador)=>{
        this.mercado = this.mercado.filter(item => item.id != jugador.id);
        console.log(jugador);
      },
      error:(err)=>{
        console.log("entra en el error");
        const error:string=err.error.message
        this.messageService.add({
          key:'toastCompra',
          severity:'error',
          detail:`${error}`
        })
        console.log(err.error.message);
        //console.log(err); 
      }
    })
  }
}
