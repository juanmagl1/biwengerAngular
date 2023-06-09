import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Login } from '../interfaces/login.interface';
import { BehaviorSubject, Observable, catchError, of, switchMap } from 'rxjs';
import { RespToken } from '../interfaces/token.interface';
import { User, UserResp } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { Mercado } from 'src/app/jugadores/interfaces/jugadores.component';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlLogin:string=`${environment.apiUrl}/signin`
  urlRegister:string=`${environment.apiUrl}/signup`
  urlObtenerJugador:string=`${environment.apiUrl}/usuario`
  private loggedIn = new BehaviorSubject<boolean> (localStorage.getItem('loggedIn')==='true'||false);
  constructor(private http:HttpClient,private router:Router) { }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get role(){
    const token:string|null=localStorage.getItem('token');
    let decodedToken:any;
    if (token!=null){
      decodedToken=jwtDecode(token)
    }
    return decodedToken.role;
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

  obtenerUsuario(username:string):Observable<UserResp>{
  return this.http.get<UserResp>(`${this.urlObtenerJugador}/${username}/obtener`);
  }

  editarUsuarioFoto(username:string,us:UserResp,img:File):Observable<any>{
    const datos: FormData = new FormData();
    datos.append('file', img,img.name);
    datos.append('user', new Blob([JSON.stringify(us)], {type: 'application/json'}))
    return this.http.put<any>(`${this.urlObtenerJugador}/${username}/update/foto`,datos)
  }

  editarUsuario(username:string,us:UserResp):Observable<UserResp>{
    return this.http.put<UserResp>(`${this.urlObtenerJugador}/${username}/update`,us)
    }

  
}
