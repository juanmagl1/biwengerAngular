import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alinea, Equipo, Mercado } from '../interfaces/jugadores.component';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
urlEquipo:string=`${environment.apiUrl}/equipo/`
urlNormal:string=`${environment.apiUrl}/jugadores/`
url:string=`${environment.apiUrl}/jugadores/mercado`
urlNombre:string=`${environment.apiUrl}/jugadores/`
urlPosiciones:string=`${environment.apiUrl}/jugadores/posicion`
urlAlineacion:string=`${environment.apiUrl}/alinea/`
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
  venderJugador(id:number):Observable<Mercado>{
    return this.http.post<Mercado>(`${this.urlNombre}${id}/vender`,{})
  }
hacerAlineacion(jugadores:Alinea):Observable<Mercado[]>{
  return this.http.post<Mercado[]>(this.urlAlineacion,jugadores)
}

devolverAlineacion(id:string):Observable<Mercado[]>{
  return this.http.get<Mercado[]>(`${this.urlAlineacion}`)
}

obtenerTodosJugadores():Observable<Mercado[]>{
  return this.http.get<Mercado[]>(this.urlNormal)
}

obtieneJugador(id:number):Observable<Mercado>{
  return this.http.get<Mercado>(`${this.urlNormal}${id}/obtieneJugador`)
}
obtenerTodosLosEquipos():Observable<Equipo[]>{
  return this.http.get<Equipo[]>(this.urlEquipo)
}
editarJugador(id:number,jugador:Mercado):Observable<Mercado>{
  return this.http.put<Mercado>(`${this.urlNormal}${id}/update`,jugador)
}
borrarJugador(id:number):Observable<Mercado>{
  return this.http.delete<Mercado>(`${this.urlNormal}${id}/delete`)
}
}
