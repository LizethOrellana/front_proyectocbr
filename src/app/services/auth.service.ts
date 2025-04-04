import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioLogueado: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setUsuarioLogueado(usuario: any) {
    this.usuarioLogueado = usuario;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
    }
  }

  getUsuarioLogueado(): any {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.usuarioLogueado) {
        const usuarioString = localStorage.getItem('usuarioLogueado');
        if (usuarioString) {
          this.usuarioLogueado = JSON.parse(usuarioString);
        }
      }
      return this.usuarioLogueado;
    } else {
      return null; // Return null if on server
    }
  }

  clearUsuarioLogueado() {
    this.usuarioLogueado = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('usuarioLogueado');
    }
  }

  isLoggedIn(): boolean {
    return !!this.getUsuarioLogueado();
  }
}