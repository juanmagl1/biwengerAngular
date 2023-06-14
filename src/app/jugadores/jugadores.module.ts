import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JugadoresRoutingModule } from './jugadores-routing.module';
import { JugadoresComponent } from './jugadores.component';
import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EquipoComponent } from './equipo/equipo.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AlineacionComponent } from './alineacion/alineacion.component';
import { EditJugadorComponent } from './edit-jugador/edit-jugador.component';
import { ListAllJugadoresComponent } from './list-all-jugadores/list-all-jugadores.component';

@NgModule({
  declarations: [
    JugadoresComponent,
    EquipoComponent,
    AlineacionComponent,
    EditJugadorComponent,
    ListAllJugadoresComponent
  ],
  imports: [
    CommonModule,
    JugadoresRoutingModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    ReactiveFormsModule
  ],
  exports:[
    JugadoresComponent,
    EquipoComponent,
    AlineacionComponent,
    EditJugadorComponent,
    ListAllJugadoresComponent
  ],
  providers:[
    MessageService
  ]
})
export class JugadoresModule { }
