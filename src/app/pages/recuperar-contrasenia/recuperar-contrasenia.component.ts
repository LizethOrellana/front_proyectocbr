import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { IniciarSesionComponent } from '../iniciar-sesion/iniciar-sesion.component';

@Component({
  selector: 'app-recuperar-contrasenia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.css']
})
export class RecuperarContraseniaComponent implements OnInit {
  cedula: string = '';
  mascota: string = '';
  ciudad: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  usuarioEncontrado: any;
  mostrarPreguntas: boolean = false;
  mostrarContrasenaInput: boolean = false;
  mostrarCedula: boolean = true;
  mensajeError: string = '';
  pregunta2: string = '¿Cuál es tu ciudad de nacimiento?';
  pregunta1: string = '¿Cuál es el nombre de tu primera mascota?'

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.mostrarCedula = true
  }

  soloNumeros(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  buscarUsuario(): void {
    if (!this.cedula) {
      this.mensajeError = 'Por favor, ingresa tu número de cédula.';
      Swal.fire({
        title: 'Error',
        text: this.mensajeError,
        icon: 'error',
      });
      return;
    }

    this.usuarioService.obtenerUsuarioPorCedula(this.cedula).subscribe(
      (usuario) => {
        this.mostrarCedula = false;
        this.usuarioEncontrado = usuario;
        this.mostrarPreguntas = true;
        this.mensajeError = '';
        Swal.fire({
          title: 'Usuario Encontrado',
          text: 'Usuario encontrado. Responde las preguntas de seguridad.',
          icon: 'success',
        });
      },
      (error) => {
        console.log(error)
        this.mensajeError = 'Usuario no encontrado. Verifica tu cédula.';
        Swal.fire({
          title: 'Error',
          text: this.mensajeError,
          icon: 'error',
        });
        console.error(error);
      }
    );
  }

  verificarPreguntas(): void {
    if (!this.mascota || !this.ciudad) {
      this.mensajeError = 'Por favor, responde ambas preguntas de seguridad.';
      Swal.fire({
        title: 'Error',
        text: this.mensajeError,
        icon: 'error',
      });
      return;
    }

    this.usuarioService
      .verificarPreguntasSeguridad(this.cedula, this.mascota, this.ciudad)
      .subscribe(
        () => {
          this.mostrarContrasenaInput = true;
          this.mensajeError = '';
          Swal.fire({
            title: 'Preguntas Correctas',
            text: 'Respuestas correctas. Ingresa tu nueva contraseña.',
            icon: 'success',
          });
        },
        (error) => {
          if (error.status === 200) {
            this.mostrarContrasenaInput = true; // Cambia esto
            this.mensajeError = '';
            Swal.fire({
              title: 'Preguntas Correctas',
              text: 'Respuestas correctas. Ingresa tu nueva contraseña.',
              icon: 'success',
            });
          } else {

            this.mensajeError = 'Respuestas de seguridad incorrectas.';
            Swal.fire({
              title: 'Error',
              text: this.mensajeError,
              icon: 'error',
            });
            console.error(error);
          }

        }
      );
  }

  cambiarContrasenia(): void {
    if (!this.nuevaContrasena || !this.confirmarContrasena) {
      this.mensajeError = 'Por favor, ingresa y confirma tu nueva contraseña.';
      Swal.fire({
        title: 'Error',
        text: this.mensajeError,
        icon: 'error',
      });
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      Swal.fire({
        title: 'Error',
        text: this.mensajeError,
        icon: 'error',
      });
      return;
    }

    this.usuarioService.cambiarContrasenia(this.cedula, this.nuevaContrasena).subscribe(
      () => {
        Swal.fire({
          title: 'Contraseña Cambiada',
          text: 'Contraseña actualizada correctamente.',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        // Manejo de errores mejorado
        if (error.status === 200) {
          // Este código nunca se ejecutará, el código 200 indica éxito, no un error.
          Swal.fire({
            title: "Éxito",  // Mejorar el título
            text: "Contraseña actualizada correctamente", // Mensaje más claro
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialog.open(IniciarSesionComponent);
            }
          });

        } else {
          this.mensajeError = 'Error al cambiar la contraseña.';
          Swal.fire({
            title: 'Error',
            text: this.mensajeError,
            icon: 'error',
          });
          console.error(error); // Importante: registra el error para depurar
        }
      }
    );
  }


}

