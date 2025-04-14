import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogRef
import { RecuperarContraseniaComponent } from '../recuperar-contrasenia/recuperar-contrasenia.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


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

  constructor(private router: Router, private authService: AuthService, public dialogRef: MatDialogRef<IniciarSesionComponent>, public dialog: MatDialog, private usuarioService: UsuarioService) { }

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
            this.router.navigate(['/']);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
      },
      (error) => {
        Swal.fire({
          title:"No se pudo iniciar sesión",
          icon: "error"
        })
        this.mensajeError = error.error;
      }
    );
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  soloNumeros(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  abrirModalForgotPassword() {
    this.dialog.open(RecuperarContraseniaComponent);
  }

}
