import { JugadoresService } from './services/jugadores.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Mercado, Posicion } from './interfaces/jugadores.component';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import Swal from 'sweetalert2';
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
  username!:string|null;
  dinero!:number
  boton:boolean=false
  constructor(private servicioMercado:JugadoresService,
  private messageService:MessageService,
  private servicioUsuario:AuthService){}
  ngOnInit(): void {
  this.cargarPosiciones()
  this.cargarDatosJugadores()
  this.username=localStorage.getItem('username')
  if (this.username!=null)
    this.mostrarDinero(this.username)
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
      if (this.input===undefined){
        console.log(this.nombre);
        this.servicioMercado.filtradoPorNombre(this.nombre)
        .subscribe({
          next:(resp)=>{
            console.log("gola");
              this.mercado=resp
            console.log(this.mercado);
          },error:(err)=>{
            console.log(err);
          }
        })

      }else{
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

  comprarJugadores(id:number){
    Swal.fire({
      title: '¿Quieres comprar a este jugador?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
      this.servicioMercado.comprarJugador(id)
    .subscribe({
      next:(jugador)=>{
        this.mercado = this.mercado.filter(item => item.id != jugador.id);
        console.log(jugador);
        if(this.username!=null)
          this.mostrarDinero(this.username)
      },
      error:(err)=>{
        const error:string=err.error.message
        this.messageService.add({
          key:'toastCompra',
          severity:'error',
          detail:`${error}`
        })
        //console.log(err); 
      }
    })
      }

    })
  }
  mostrarDinero(id:string){
    this.servicioUsuario.obtenerUsuario(id)
    .subscribe({
      next:(resp)=>{
        this.dinero=resp.dinero
      }
    })
  }
}
