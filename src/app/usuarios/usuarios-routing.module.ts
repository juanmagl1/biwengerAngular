import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditRolComponent } from './edit-rol/edit-rol.component';
import { RoleGuard } from '../auth/services/role.guard';

const routes: Routes = [{ path: 'lista', component: UsuariosListComponent },
{ path: 'accion', component: ListUsersComponent, canActivate:[RoleGuard] },
{ path: 'edit-role/:username', component: EditRolComponent,canActivate:[RoleGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
