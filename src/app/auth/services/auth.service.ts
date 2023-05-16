import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Login } from '../interfaces/login.interface';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { RespToken } from '../interfaces/token.interface';
import { User, UserResp } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlLogin:string=`${environment.apiUrl}/signin`
  urlRegister:string=`${environment.apiUrl}/signup`
  constructor(private http:HttpClient,private router:Router) { }

  login(user:Login):Observable<Boolean>{
    return this.http.post<RespToken>(this.urlLogin,user)
    .pipe(switchMap(token=>{
      localStorage.setItem('token',token.token)
      localStorage.setItem('username',user.username)
      return of(true)
    }
    ),catchError(_error=>{
      console.log(_error);
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      return of(false)
    })
    )
  }

  logout():void{
    localStorage.removeItem('token')
    localStorage.removeItem('username'); 
    this.router.navigate(['/auth/login']) 
  }

  register(user:User):Observable<boolean>{
    return this.http.post<UserResp>(this.urlRegister,user)
    .pipe(switchMap(resp=>{
      return of(true);
      
    }),catchError(_error=>{
      console.log(_error);
      return of(false)
    })
    
    )
  }
}
