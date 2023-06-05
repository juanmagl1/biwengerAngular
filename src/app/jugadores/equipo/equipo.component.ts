import { Component, OnInit } from '@angular/core';
import { Mercado } from '../interfaces/jugadores.component';
import { JugadoresService } from '../services/jugadores.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit{
  constructor(private jugadorService:JugadoresService){}
  username:string|null="";
  plantilla:Mercado[]=[]
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


}
