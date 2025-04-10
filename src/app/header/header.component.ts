import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IniciarSesionComponent } from '../pages/iniciar-sesion/iniciar-sesion.component';
import { Usuario } from '../models/Usuario';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { RecuperarContraseniaComponent } from '../pages/recuperar-contrasenia/recuperar-contrasenia.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit {
  usuarioLogueado: Usuario | null = null;
  mostrarBotonInicioSesion = true;
  esAdministrador = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.usuarioLogueado = this.authService.getUsuarioLogueado();
    this.mostrarBotonInicioSesion = !this.usuarioLogueado;
    this.cargarUsuarioLogueado();
  }



  cargarUsuarioLogueado() {
    if (isPlatformBrowser(this.platformId)) {
      const usuarioGuardado = localStorage.getItem('usuarioLogueado');
      if (usuarioGuardado) {
        this.usuarioLogueado = JSON.parse(usuarioGuardado);
        console.log('Usuario recuperado del caché:', this.usuarioLogueado);
        console.log(this.usuarioLogueado)
        if (this.usuarioLogueado?.rol == "ADMINISTRADOR") {
          this.esAdministrador = true;
        }
      } else {
        console.log('Usuario no encontrado en el caché.');
      }
    }
  }

  cerrarSesion() {
    this.authService.clearUsuarioLogueado();
    this.usuarioLogueado = null;
    this.mostrarBotonInicioSesion = true;
    this.router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  crearDocumento() {
    this.router.navigate(['/crear-documento']);
  }
  crearUsuario() {
    this.router.navigate(['/crear-usuario']);
  }

  abrirModalInicioSesion() {
    this.dialog.open(IniciarSesionComponent);
  }

  
}
