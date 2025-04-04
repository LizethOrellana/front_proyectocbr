import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-recuperar-contrasenia',
  standalone: true,
  imports: [    BrowserModule,
    FormsModule],
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrl: './recuperar-contrasenia.component.css'
})
export class RecuperarContraseniaComponent {

  cedula: string = '';
  pregunta1: string = '¿Cuál es el nombre de tu primera mascota?'; // Reemplaza con tus preguntas
  pregunta2: string = '¿Cuál es tu ciudad de nacimiento?';
  respuesta1: string = '';
  respuesta2: string = '';
  mostrarNuevaContrasena: boolean = false;
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';

  constructor(public dialogRef: MatDialogRef<RecuperarContraseniaComponent>) { }

  ngOnInit() {
  }

  verificarRespuestas() {
    console.log('Verificando respuestas...');
    this.mostrarNuevaContrasena = true;
  }

  cambiarContrasena() {
    console.log('Cambiando contraseña...');
    this.cerrarModal();
  }

  cerrarModal() {
    this.dialogRef.close();
  }
}
