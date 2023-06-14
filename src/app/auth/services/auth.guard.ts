import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private auth:AuthService,private router:Router){}
  flag!:boolean
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('username')!==''){
        this.flag= true
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tienes que estar registrado!'
      })
      //Si no entra redirige al login
      this.router.navigate(['/'])
      this.flag=false
    }
    //Devuelve el valor de la bandera
    return this.flag;
}
  }
  
