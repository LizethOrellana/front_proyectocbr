import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL_USUARIO: string;

  constructor(private http: HttpClient, private generalService: GeneralService) {
    this.URL_USUARIO = `${this.generalService.baseUrl}/api/usuarios`;
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<[Usuario]>(`${this.generalService.baseUrl}`);
  }

  editarUsuario(id: any, Usuario: any[]): Observable<string> {
    return this.http.put<string>(`${this.URL_USUARIO}/${id}`, Usuario);
  }

  registrarUsuario(Usuario: any): Observable<any> {
    return this.http.post<any>(`${this.URL_USUARIO}`, Usuario);
  }
}
