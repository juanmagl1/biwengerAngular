import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../services/jugadores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo, Mercado } from '../interfaces/jugadores.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-jugador',
  templateUrl: './edit-jugador.component.html',
  styleUrls: ['./edit-jugador.component.css']
})
export class EditJugadorComponent implements OnInit{
  id!:number;
  jugador!:Mercado
  equipoActual!:string;
  equipos!:Equipo[]
  constructor(private jug:JugadoresService,
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private router:Router,
    private messageService:MessageService){}
    myForm:FormGroup=this.fb.group({
      id:['',],
      nombre:[''],
      precio:[''],
      posicion:[''],
      pais:['',],
      puntos:[''],
      idEquipo:[''],
      username:['']
    })
  ngOnInit(): void {
    this.jug.obtenerTodosLosEquipos()
    .subscribe({
      next:(res)=>{
        this.equipos=res
      }
    })
    this.id=this.route.snapshot.params['id']
    this.jug.obtieneJugador(this.id)
    .subscribe({
      next:(value)=>{
        this.jugador=value
        this.myForm.setValue({
          id:value.id,
          nombre:value.nombre,
          precio:value.precio,
          posicion:value.posicion,
          pais:value.pais,
          puntos:value.puntos,
          idEquipo:value.idEquipo,
          username:value.username
        })
      }
    })
  }
editar(){
  this.jug.editarJugador(this.id,this.myForm.value)
  .subscribe({
    next:(resp)=>{
      this.router.navigate(['jugadores/lista'])
    },
    error:(err)=>{
      console.log(err);
      
    }
  })

}
}
