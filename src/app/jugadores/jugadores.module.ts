import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JugadoresRoutingModule } from './jugadores-routing.module';
import { JugadoresComponent } from './jugadores.component';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EquipoComponent } from './equipo/equipo.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    JugadoresComponent,
    EquipoComponent
  ],
  imports: [
    CommonModule,
    JugadoresRoutingModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressSpinnerModule
  ],
  exports:[
    JugadoresComponent,
    EquipoComponent
  ],
  providers:[
    MessageService
  ]
})
export class JugadoresModule { }
