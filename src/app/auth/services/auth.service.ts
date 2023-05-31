import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Login } from '../interfaces/login.interface';
import { BehaviorSubject, Observable, catchError, of, switchMap } from 'rxjs';
import { RespToken } from '../interfaces/token.interface';
import { User, UserResp } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlLogin:string=`${environment.apiUrl}/signin`
  urlRegister:string=`${environment.apiUrl}/signup`
  private loggedIn = new BehaviorSubject<boolean> (localStorage.getItem('loggedIn')==='true'||false);
  constructor(private http:HttpClient,private router:Router) { }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(user:Login):Observable<Boolean>{
    return this.http.post<RespToken>(this.urlLogin,user)
    .pipe(switchMap(token=>{
      localStorage.setItem('token',token.token)
      localStorage.setItem('username',user.username)
      localStorage.setItem('loggedIn','true')
      this.loggedIn.next(true);
      return of(true)
    }
    ),catchError(_error=>{
      console.log(_error);
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('loggedIn')
      this.loggedIn.next(false);
      return of(false)
    })
    )
  }

  logout():void{
    localStorage.removeItem('token')
    localStorage.removeItem('username'); 
    localStorage.removeItem('loggedIn')
    this.loggedIn.next(false);
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
