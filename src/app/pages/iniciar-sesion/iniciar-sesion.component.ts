import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogRef
import { RecuperarContraseniaComponent } from '../recuperar-contrasenia/recuperar-contrasenia.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-iniciar-sesion',
   standalone: true,
    imports: [FormsModule, CommonModule], 
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  contrasenia:string="";
  cedula:string="";
  mensajeError: string = '';

  constructor(public dialogRef: MatDialogRef<IniciarSesionComponent>,public dialog: MatDialog, private usuarioService:UsuarioService) { } 

  iniciarSesion() {
    this.usuarioService.iniciarSesion(this.cedula, this.contrasenia).subscribe(
      (usuarioLogueado) => {
        console.log('Usuario logueado:', usuarioLogueado);
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado)); 
        this.dialogRef.close(usuarioLogueado);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.mensajeError = error.error;
      }
    );
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  abrirModalForgotPassword() {
    console.log("Abrir olvido contraseña")
    this.dialog.open(RecuperarContraseniaComponent);
  }
}
