import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor } from '../models/Autor';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  
  private URL_AUTOR: string;

  constructor(private http: HttpClient, private generalService: GeneralService) {
    this.URL_AUTOR = `${this.generalService.baseUrl}/api/autores`;
  }

  obtenerAutores(): Observable<Autor[]> {
    return this.http.get<[Autor]>(`${this.generalService.baseUrl}`);
  }

  editarAutores(id: any, Autor: any[]): Observable<string> {
    return this.http.put<string>(`${this.URL_AUTOR}/${id}`, Autor);
  }

  registrarAutor(Autor: any): Observable<any> {
    return this.http.post<any>(`${this.URL_AUTOR}`, Autor);
  }
}
