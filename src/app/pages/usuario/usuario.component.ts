import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = {
    id_usuario: undefined,
    nombre: '',
    contrasenia: '',
    cedula: '',
    rol: '',
    primera_pregunta: '',
    segunda_pregunta: ''
  };
  repcontrasenia: string = "";

  maxUsuarios: number = 5;

  esEditar: Boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  vaciarCampos() {
    this.nuevoUsuario = {
      id_usuario: undefined,
      nombre: '',
      contrasenia: '',
      cedula: '',
      rol: '',
      primera_pregunta: '',
      segunda_pregunta: ''
    };
  }

  crearUsuario() {
    if (this.esEditar == true) {
      this.editarUsuario(this.nuevoUsuario);
    } else {
      if (!this.nuevoUsuario.cedula || !this.nuevoUsuario.nombre ||
        !this.nuevoUsuario.primera_pregunta || !this.nuevoUsuario.segunda_pregunta ||
        !this.nuevoUsuario.contrasenia || !this.repcontrasenia) {
        alert("Por favor, complete todos los campos.");
        return;
      }

      if (this.repcontrasenia !== this.nuevoUsuario.contrasenia) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      if (this.usuarios.length >= this.maxUsuarios) {
        alert(`No se pueden crear más de ${this.maxUsuarios} usuarios.`);
        return;
      }

      this.nuevoUsuario.rol = "CONTRIBUIDOR";
      this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(
        (response: any) => {
          Swal.fire({
            text: 'Usuario Creado Correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        },
        (error: HttpErrorResponse) => {
          if (error.status === 200) {
            Swal.fire({
              text: 'Usuario Creado Correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              text: 'Ocurrió un error al guardar: ' + error.error,
              icon: 'error',
            });
          }
        }
      );

    }
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioService.editarUsuario(usuario.cedula, usuario).subscribe(
      (response: any) => {
        Swal.fire({
          text: 'Usuario Editado Correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      },
      (error: HttpErrorResponse) => {
        if (error.status === 200) {
          Swal.fire({
            text: 'Usuario Editado Correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            text: 'Ocurrió un error al editar: ' + error.error,
            icon: 'error',
          });
        }
      })

  }

  seleccionarEditar(usuario: Usuario) {
    console.log('Editar usuario:', usuario);
    this.nuevoUsuario = usuario;
    this.esEditar = true;
  }

  eliminarUsuario(cedula: string): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(cedula).subscribe(
          (response: any) => {
            Swal.fire({
              text: 'Usuario Eliminado Correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          },
          (error: HttpErrorResponse) => {
            if (error.status === 200) {
              Swal.fire({
                text: 'Usuario Eliminado Correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire({
                text: 'Ocurrió un error al eliminar: ' + error.error,
                icon: 'error',
              });
            }
          });
      }
    })
  }
}