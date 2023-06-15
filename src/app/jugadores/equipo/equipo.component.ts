import { Component, OnInit } from '@angular/core';
import { Alinea, Mercado } from '../interfaces/jugadores.component';
import { JugadoresService } from '../services/jugadores.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit{
  username:string|null="";
  plantilla!:Mercado[];
  alineacion:Mercado[]=[];
  numJornada!:number
  objeto!:Alinea;
  correcto!:boolean;
  constructor(private jugadorService:JugadoresService,
  private messageService: MessageService ){}
  ngOnInit(): void {
    this.username=localStorage.getItem('username');
    this.jugadorService.equipo(this.username||"")
    .subscribe({
      next:(resp)=>{
        this.plantilla=resp;
        console.log(resp);
        
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
              key:'plantilla',
              severity:'success',
              detail:"Jugador vendido"
            })
            this.plantilla=this.plantilla.filter(item=>item.id!=jugador.id);
            this.alineacion=this.alineacion.filter(item=>item.id!=jugador.id);
          }
        })
      }

    })
}

hacerAlineacion(jugador:Mercado){
 
  //compruebo que no tiene mas de 11 jugadores
  if (this.alineacion.length>11){
    this.messageService.add({
      key:'plantilla',
      severity:'error',
      detail:'No puedes alinear más de 11 jugadores'
    })
    //Si tiene menos de 11 pues añado al jugador
  }else {
    if (!this.alineacion.includes(jugador)){
      this.alineacion.push(jugador)
      jugador.alinea=true
  }
  }
  
}

comprobarAlineacion():boolean{
  let contPortero=0,contDefensa=0,contCentro=0,contDelantero=0;
  //Lleno los contadores para ver si es correcta
  for (let i=0;i<this.alineacion.length;i++){
    switch (this.alineacion[i].posicion){
      case "Portero":
        contPortero++
        break;
        case "Defensa":
          contDefensa++
          break;
        case "Centrocampista":
          contCentro++
          break;
        case "Delantero":
          contDelantero++;
          break;
    }
  }
  //Si es correcto pues se pasa a guardar
  if (contPortero<=1&&contDefensa<=4&&contCentro<=3&&contDelantero<=3){
    this.correcto=true
  }else {
    this.correcto=false
  }
  return this.correcto;
}

quitarJugadorAlineacion(jugador:Mercado){
  this.alineacion=this.alineacion.filter(item=>item.id!=jugador.id)
  jugador.alinea=false
}

guardarAlineacion(){
  if (!this.comprobarAlineacion()){
 //Si no que muestre un mensaje
 this.messageService.add({
  key:'plantilla',
  severity:'error',
  detail:'La alineación no es correcta, revisala'
})
  }else{
    this.objeto={
      numJornada:3,
      alineacion:this.alineacion
     }  
      this.jugadorService.hacerAlineacion(this.objeto)
      .subscribe({
        next:(resp)=>{
          this.messageService.add({
            key:'plantilla',
            severity:'success',
            detail:'Alineación guardada'
          })
        },error:(error)=>{
          console.log(error);
        }
      })
  }
 
}
vaciarPlantilla(){
  for(let i=0;i<this.alineacion.length;i++){
    this.alineacion[i].alinea=false
  }
  this.alineacion=[]
  this.messageService.add({
    key:'plantilla',
    severity:'success',
    detail:'Plantilla vaciada con exito'
  })
  
}
}
