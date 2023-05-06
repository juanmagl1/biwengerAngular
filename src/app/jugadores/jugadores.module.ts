import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JugadoresRoutingModule } from './jugadores-routing.module';
import { JugadoresComponent } from './jugadores.component';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    JugadoresComponent
  ],
  imports: [
    CommonModule,
    JugadoresRoutingModule,
    HttpClientModule,
    TableModule,
    FormsModule
  ],
  exports:[
    JugadoresComponent
  ]
})
export class JugadoresModule { }
