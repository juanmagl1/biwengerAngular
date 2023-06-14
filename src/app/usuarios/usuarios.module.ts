import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { EditRolComponent } from './edit-rol/edit-rol.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsuariosListComponent,
    ListUsersComponent,
    EditRolComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    TableModule,
    ToastModule,
    ReactiveFormsModule
  ],
  exports: [
    UsuariosListComponent,
    ListUsersComponent,
    EditRolComponent
  ]
})
export class UsuariosModule { }
