import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IniciarSesionComponent } from '../pages/iniciar-sesion/iniciar-sesion.component';
import { Usuario } from '../models/Usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit{
  usuarioLogueado: Usuario | null = null;
  mostrarBotonInicioSesion = true;

  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.usuarioLogueado = this.authService.getUsuarioLogueado();
    this.mostrarBotonInicioSesion = !this.usuarioLogueado;
  }

  

  cargarUsuarioLogueado() {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      this.usuarioLogueado = JSON.parse(usuarioGuardado);
      console.log('Usuario recuperado del caché:', this.usuarioLogueado);
    } else {
      console.log('Usuario no encontrado en el caché.');
    }
  }

  cerrarSesion() {
    this.authService.clearUsuarioLogueado();
    this.usuarioLogueado = null;
    this.mostrarBotonInicioSesion = true; 
    this.router.navigate(['/']);
  }

  crearDocumento(){
    this.router.navigate(['/crear-documento']);
  }
  crearUsuario(){
    this.router.navigate(['/crear-usuario']);
  }

  abrirModalInicioSesion() {
    this.dialog.open(IniciarSesionComponent);
  }
}
