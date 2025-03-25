import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documento } from '../models/Documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
private URL_DOCUMENTO: string;

  constructor(private http: HttpClient, private generalService: GeneralService) {
    this.URL_DOCUMENTO = `${this.generalService.baseUrl}/api/documentos`;
  }

  obtenerDocumentos(): Observable<Documento[]> {
    return this.http.get<[Documento]>(`${this.generalService.baseUrl}`);
  }

  editarDocumento(id: any, Documento: any[]): Observable<string> {
    return this.http.put<string>(`${this.URL_DOCUMENTO}/${id}`, Documento);
  }

  registrarDocumento(Documento: any): Observable<any> {
    return this.http.post<any>(`${this.URL_DOCUMENTO}`, Documento);
  }
}
