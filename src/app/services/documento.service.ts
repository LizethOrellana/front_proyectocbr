import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documento } from '../models/Documento';
import { Autor } from '../models/Autor';
import { Carrera } from '../models/Carrera';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  
private URL_DOCUMENTO: string;

  constructor(private http: HttpClient, private generalService: GeneralService) {
    this.URL_DOCUMENTO = `${this.generalService.baseUrl}/api/documentos`;
  }

  obtenerDocumentos(): Observable<Documento[]> {
    return this.http.get<[Documento]>(`${this.URL_DOCUMENTO}`);
  }

  editarDocumento(documento: any): Observable<string> {
    return this.http.put<string>(`${this.URL_DOCUMENTO}/${documento.id_documento}`, documento);
  }

  registrarDocumento(Documento: any): Observable<any> {
    return this.http.post<any>(`${this.URL_DOCUMENTO}/crear`, Documento);
  }

  buscarxAutor(autor: Autor): Observable<Documento[]> { // Cambiar el tipo de retorno a Documento[]
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Documento[]>(`${this.URL_DOCUMENTO}/buscarAutor`, autor, { headers: headers }); // Usar http.post
  }

  buscarxCarrera(carrera: Carrera): Observable<Documento[]> { // Cambiar el tipo de retorno a Documento[]
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Documento[]>(`${this.URL_DOCUMENTO}/buscarCarrera`, carrera, { headers: headers }); // Usar http.post
  }

  buscarxAnio(anio: number): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.URL_DOCUMENTO}/buscarPorAnio?anio=${anio}`);
  }

  buscarPorNombre(nombre: string): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.URL_DOCUMENTO}/buscarPorNombre?nombre=${nombre}`);
  }

  deleteDocumento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_DOCUMENTO}/${id}`);
  }
}
