import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugadoresComponent } from './jugadores.component';
import { EquipoComponent } from './equipo/equipo.component';

const routes: Routes = [
  { path: 'mercado', 
  component: JugadoresComponent 
  },
  { path: 'equipo', 
  component: EquipoComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugadoresRoutingModule { }
