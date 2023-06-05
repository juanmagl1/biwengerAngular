import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mercado } from '../interfaces/jugadores.component';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
url:string=`${environment.apiUrl}/jugadores/mercado`
urlNombre:string=`${environment.apiUrl}/jugadores/`
urlPosiciones:string=`${environment.apiUrl}/jugadores/posicion`
  constructor(private http:HttpClient) { }

  mercado():Observable<Mercado[]>{
    return this.http.get<Mercado[]>(this.url)
  }

  posiciones():Observable<string[]>{
    return this.http.get<string[]>(this.urlPosiciones)
  }

  filtradoPorPosicion(input:string):Observable<Mercado[]>{
    return this.http.get<Mercado[]>(`${this.urlPosiciones}/${input}`)
  }

  filtradoPorNombre(input:string):Observable<Mercado[]>{
    return this.http.get<Mercado[]>(`${this.urlNombre}${input}`)
  }

  comprarJugador(id:number):Observable<Mercado>{
    return this.http.post<Mercado>(`${this.urlNombre}${id}/fichar`,{})
  }

  equipo(username:string):Observable<Mercado[]>{
    return this.http.get<Mercado[]>(`${this.urlNombre}${username}/plantilla`)
  }
}
