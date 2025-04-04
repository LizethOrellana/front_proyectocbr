import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogRef
import { RecuperarContraseniaComponent } from '../recuperar-contrasenia/recuperar-contrasenia.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  contrasenia: string = "";
  cedula: string = "";
  mensajeError: string = '';

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<IniciarSesionComponent>, public dialog: MatDialog, private usuarioService: UsuarioService) { }

  iniciarSesion() {
    this.usuarioService.iniciarSesion(this.cedula, this.contrasenia).subscribe(
      (usuarioLogueado) => {
        this.authService.setUsuarioLogueado(usuarioLogueado);
        Swal.fire({
          title:"Bienvenido "+usuarioLogueado.nombre,
          text: "Se inicio sesión correctamente",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
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
