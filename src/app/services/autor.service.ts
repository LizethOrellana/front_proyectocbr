import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor } from '../models/Autor';
import { catchError, Observable, throwError } from 'rxjs';
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

  buscarAutores(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_AUTOR}/buscar?nombre=${nombre}`);
  }

  crearAutor(nombre: string): Observable<any> {
    return this.http.post<any>(`${this.URL_AUTOR}/crear`, { nombre: nombre }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Ya existe un autor con ese nombre.'); // Mensaje de error personalizado
  }
}
