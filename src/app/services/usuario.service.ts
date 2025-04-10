import { HttpClient, HttpParams } from '@angular/common/http';
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

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.URL_USUARIO);
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.URL_USUARIO}/crearusuario`, usuario);
  }

  eliminarUsuario(cedula: string): Observable<any> {
    return this.http.delete(`${this.URL_USUARIO}/eliminarusuario/${cedula}`);
  }

  iniciarSesion(cedula: string, contrasenia: string): Observable<Usuario> {
    const params = new HttpParams()
      .set('cedula', cedula)
      .set('contrasenia', contrasenia);
    return this.http.post<Usuario>(`${this.URL_USUARIO}/iniciarsesion`, params);
  }

  editarUsuario(cedula: string, usuario: any): Observable<any> {
    return this.http.put(`${this.URL_USUARIO}/editarusuario/${cedula}`, usuario);
  }

  recuperarclave(cedula: string, mascota: string, ciudad: string): Observable<Usuario> {
    const params = new HttpParams()
      .set('cedula', cedula)
      .set('mascota', mascota)
      .set('ciudad',ciudad);
    return this.http.post<Usuario>(`${this.URL_USUARIO}/buscarusuario`, params);
  }

}
