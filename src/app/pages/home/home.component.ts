import { Component } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { Documento } from '../../models/Documento';
import { CommonModule } from '@angular/common';
import { AutorService } from '../../services/autor.service';
import { Autor } from '../../models/Autor';
import { Carrera } from '../../models/Carrera';
import { CarreraService } from '../../services/carrera.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/Usuario';
import { AuthService } from '../../services/auth.service';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DocumentoService],
})
export class HomeComponent {
  documentos: Documento[] = [];
  autores: Autor[] = [];
  mostrarAutores = false;

  mostrarCarreras = false;
  carreras: Carrera[] = [];

  mostrarAnios = false;
  anios: number[] = [];

  nombreBusqueda: string = '';
  usuarioLogueado: Usuario | null = null;
  mostrarBotonInicioSesion = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router,
    private documentoService: DocumentoService,
    private autorService: AutorService,
    private carreraService: CarreraService) { }

  ngOnInit(): void {
    this.usuarioLogueado = this.authService.getUsuarioLogueado();
    this.mostrarBotonInicioSesion = !this.usuarioLogueado;
    this.obtenerDocumentos();
  }

  obtenerDocumentos() {
    this.documentoService.obtenerDocumentos().subscribe((response: Documento[]) => {
      this.documentos = response;
    });
  }

  verDocumento(documento: Documento) {
    if (documento.id_documento) {
      console.log("ID DOCUMENTO: " + documento.id_documento)
      const url = `http://localhost:8080/api/documentos/verdocumento/${documento.id_documento}`; // Reemplaza "tu-backend" con la URL de tu backend
      window.open(url, '_blank'); // Abre el archivo en una nueva pestaña
    } else {
      console.error('El documento no tiene un ID válido.');
    }
  }

  listarAutor() {
    console.log("Listando Autores")
    this.autorService.obtenerAutores().subscribe((autores) => {
      this.autores = autores;
      this.mostrarAutores = !this.mostrarAutores;
      console.log(autores)
    });
  }

  listarCarreras() {
    console.log("Listando Carreras")
    this.carreraService.obtenerCarrera().subscribe((carreras) => {
      this.carreras = carreras;
      this.mostrarCarreras = !this.mostrarCarreras;
      console.log(carreras)
    });
  }


  buscarxAutor(autor: Autor) {
    console.log("Buscando por Autor")
    console.log(autor)
    this.documentoService.buscarxAutor(autor).subscribe((documentosxAutor) => {
      this.documentos = documentosxAutor;
      if (this.documentos.length == 0) {
        Swal.fire({
          text: 'No se encontro documentos para este autor',
          icon: 'warning',
        })
        this.obtenerDocumentos();
      }
    })
  }

  buscarxCarrera(carrera: Carrera) {
    console.log("Buscando por Carrera")
    console.log(carrera)
    this.documentoService.buscarxCarrera(carrera).subscribe((documentoxCarrera) => {
      this.documentos = documentoxCarrera;
      if (this.documentos.length == 0) {
        Swal.fire({
          text: 'No se encontro documentos para esta carrera',
          icon: 'warning',
        })
        this.obtenerDocumentos();
      }
    })
  }

  generarAnios() {
    const anioActual = new Date().getFullYear();
    for (let i = anioActual; i >= 1900; i--) {
      this.anios.push(i);
    }
    this.mostrarAnios = !this.mostrarAnios;
  }

  buscarxAnio(anio: number) {
    this.documentoService.buscarxAnio(anio).subscribe((documentoxAnios) => {
      this.documentos = documentoxAnios;
      if (this.documentos.length == 0) {
        Swal.fire({
          text: 'No se encontro documentos en este año',
          icon: 'warning',
        })
        this.obtenerDocumentos();
      }
    })
  }

  buscarDocumentos() {
    if (this.nombreBusqueda == "") {
      console.log("Se cargan todos los dcumentos")
      this.obtenerDocumentos();
    } else {
      console.log("Documento a buscar:" + this.nombreBusqueda)
      this.documentoService.buscarPorNombre(this.nombreBusqueda).subscribe(
        (documentos) => {
          this.documentos = documentos;
          if (documentos.length == 0) {
            Swal.fire({
              text: 'No se encontro documentos con este nombre',
              icon: 'warning',
            })
            this.obtenerDocumentos();
          }
        },
        (error) => {
          Swal.fire({
            text: 'Ocurrió un error al guardar: ' + error,
            icon: 'error',
          });
        }
      );
    }

  }

  editarDocumento(documento: Documento) {
    this.router.navigate(['/crear-documento', { documentoEditar: documento.id_documento }]);
}

  eliminarDocumento(id: number) {
    this.documentoService.deleteDocumento(id).subscribe(() => {
      Swal.fire({
        text: 'Documento Eliminado Correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    });
  }
}