import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'auth/login',pathMatch:'full'},
  { path: 'jugadores', loadChildren: () => import('./jugadores/jugadores.module').then(m => m.JugadoresModule),canActivateChild:[AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),canActivateChild:[AuthGuard]},
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),canActivateChild:[AuthGuard]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
