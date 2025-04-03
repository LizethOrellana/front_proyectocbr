import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  vaciarCampos(){
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
    // Validar campos llenos
    if (!this.nuevoUsuario.cedula || !this.nuevoUsuario.nombre || 
        !this.nuevoUsuario.primera_pregunta || !this.nuevoUsuario.segunda_pregunta ||
        !this.nuevoUsuario.contrasenia || !this.repcontrasenia) {
      alert("Por favor, complete todos los campos.");
      return; // Detener la creación del usuario
    }

    // Validar contraseñas coincidentes
    if (this.repcontrasenia !== this.nuevoUsuario.contrasenia) {
      alert("Las contraseñas no coinciden.");
      return; // Detener la creación del usuario
    }

    // Validar número máximo de usuarios
    if (this.usuarios.length >= this.maxUsuarios) {
      alert(`No se pueden crear más de ${this.maxUsuarios} usuarios.`);
      return; // Detener la creación del usuario
    }

    // Crear usuario si todas las validaciones pasan
    this.nuevoUsuario.rol = "CONTRIBUIDOR";
    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(() => {
      this.cargarUsuarios();
      this.nuevoUsuario = {
        id_usuario: undefined,
        nombre: '',
        contrasenia: '',
        cedula: '',
        rol: '',
        primera_pregunta: '',
        segunda_pregunta: ''
      };
      this.repcontrasenia = ''; // Limpiar la contraseña repetida
    });
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioService.editarUsuario(usuario.cedula,usuario).subscribe(()=>{
      this.cargarUsuarios();
      this.vaciarCampos();
    })
  }

  seleccionarEditar(usuario: Usuario) {
    console.log('Editar usuario:', usuario);
    this.nuevoUsuario=usuario;
  }

  eliminarUsuario(cedula: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(cedula).subscribe(
        response => {
          console.log('Usuario eliminado:', response);
          this.usuarioService.eliminarUsuario(cedula).subscribe(()=>{
            this.cargarUsuarios();
          })
        },
        error => {
          console.error('Error al eliminar usuario:', error);
          // Mostrar mensaje de error
        }
      );
    }
  }
}