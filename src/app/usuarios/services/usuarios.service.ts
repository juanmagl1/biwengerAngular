import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url:string=`${environment.apiUrl}/usuario/puntos`;
  constructor(private http:HttpClient) { }
usuariosOrdenados():Observable<User[]>{
  return this.http.get<User[]>(this.url)
}
}
