import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';
import { Carrera } from '../models/Carrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
private URL_CARRERA: string;

  constructor(private http: HttpClient, private generalService: GeneralService) {
    this.URL_CARRERA = `${this.generalService.baseUrl}/api/carreras`;
  }

  obtenerCarrera(): Observable<Carrera[]> {
    return this.http.get<[Carrera]>(`${this.generalService.baseUrl}`);
  }

  editarCarreras(id: any, Carrera: any[]): Observable<string> {
    return this.http.put<string>(`${this.URL_CARRERA}/${id}`, Carrera);
  }

  registrarCarreras(Carrera: any): Observable<any> {
    return this.http.post<any>(`${this.URL_CARRERA}`, Carrera);
  }

  buscarCarreras(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_CARRERA}/buscar?nombre=${nombre}`);
  }

  crearCarrera(nombre: string): Observable<any> {
    return this.http.post<any>(`${this.URL_CARRERA}/crear`, { nombre: nombre });
  }
}
