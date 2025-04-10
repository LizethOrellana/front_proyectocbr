import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasenia',
  standalone: true,
  imports: [    CommonModule,
    FormsModule],
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrl: './recuperar-contrasenia.component.css'
})
export class RecuperarContraseniaComponent {


  pregunta1: string = '¿Cuál es el nombre de tu primera mascota?'; // Reemplaza con tus preguntas
  pregunta2: string = '¿Cuál es tu ciudad de nacimiento?';
  respuesta1: string = '';
  respuesta2: string = '';
  mostrarNuevaContrasena: boolean = false;
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  dialog: any;

  
  cedula1: string = '';
  mascota: string = '';
  ciudad: string = '';
  mensajeError: any;


  constructor(private router: Router,public dialogRef: MatDialogRef<RecuperarContraseniaComponent> , private usuarioService: UsuarioService, private authService: AuthService) { }

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















  soloNumeros(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }








  verificarDatos() {
    // Validación básica antes de enviar datos
    if (!this.cedula1 || !this.mascota || !this.ciudad) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    console.log(this.cedula1+" "+this.mascota+" "+this.ciudad)
        this.usuarioService.recuperarclave(this.cedula1, this.mascota,this.ciudad).subscribe(
          (usuariorecuperado) => {
            alert(usuariorecuperado)
            Swal.fire({
              title:"Bienvenido de nuevo tus credenciales son Cedula:"+usuariorecuperado.cedula+"Contraseña:"+usuariorecuperado.contrasenia,
              text: "Se recupero correctamente",
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
              title:"No se pudo recuperar",
              icon: "error"
            })
            this.mensajeError = error.error;
          }
        );
    









    
  }


  
}
