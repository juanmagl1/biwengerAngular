import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserResp } from 'src/app/auth/interfaces/user.interface';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url:string=`${environment.apiUrl}/usuario/puntos`;
  urlTodosUsuarios:string=`${environment.apiUrl}/usuario/todos`
  urlBorrado:string=`${environment.apiUrl}/usuario/`
  constructor(private http:HttpClient) { }
usuariosOrdenados():Observable<User[]>{
  return this.http.get<User[]>(this.url)
}

obtenerTodosUsuarios():Observable<User[]>{
  return this.http.get<User[]>(this.urlTodosUsuarios)
}

borrarUsuario(id:String):Observable<UserResp>{
  return this.http.delete<UserResp>(`${environment.apiUrl}/usuario/${id}/borrar`)
}
editRol(id:string,us:UserResp):Observable<UserResp>{
  return this.http.put<UserResp>(`${this.urlBorrado}${id}/update/rol`,us)
}
}
