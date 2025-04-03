import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IniciarSesionComponent } from '../pages/iniciar-sesion/iniciar-sesion.component';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit{
  usuarioLogueado: Usuario | null = null;

  ngOnInit() {
    //this.cargarUsuarioLogueado();
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
    localStorage.removeItem('usuarioLogueado');
  }

  constructor(private router: Router, public dialog: MatDialog) { }
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
