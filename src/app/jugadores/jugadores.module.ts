import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JugadoresRoutingModule } from './jugadores-routing.module';
import { JugadoresComponent } from './jugadores.component';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    JugadoresComponent
  ],
  imports: [
    CommonModule,
    JugadoresRoutingModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    ToastModule
  ],
  exports:[
    JugadoresComponent
  ],
  providers:[
    MessageService
  ]
})
export class JugadoresModule { }
