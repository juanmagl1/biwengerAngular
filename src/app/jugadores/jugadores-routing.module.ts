import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { JugadoresComponent } from './jugadores.component';
import { EquipoComponent } from './equipo/equipo.component';
import { AlineacionComponent } from './alineacion/alineacion.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { ListAllJugadoresComponent } from './list-all-jugadores/list-all-jugadores.component';
import { EditJugadorComponent } from './edit-jugador/edit-jugador.component';
import { RoleGuard } from '../auth/services/role.guard';

const routes: Routes = [
  { path: 'mercado', 
  component: JugadoresComponent 
  },
  { path: 'equipo', 
  component: EquipoComponent 
  },
  { path: 'alineacion', 
  component: AlineacionComponent 
  },
  { path: 'lista', 
  component: ListAllJugadoresComponent 
  },
  { path: 'editar-jugador/:id', 
  component: EditJugadorComponent,
  canActivate:[RoleGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugadoresRoutingModule { }
