import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { Documento } from '../../models/Documento';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutorService } from '../../services/autor.service';
import { CarreraService } from '../../services/carrera.service';
import { Autor } from '../../models/Autor';
import { Carrera } from '../../models/Carrera';
@Component({
  selector: 'app-form-documento',
  standalone: true,
  imports: [FormsModule, CommonModule], // Añade CommonModule aquí
  templateUrl: './form-documento.component.html',
  styleUrls: ['./form-documento.component.css']
})
export class FormDocumentoComponent implements OnInit {
  documento: Documento = {
    id_documento: undefined,
    contenido: '',
    titulo: '',
    resumen: '',
    anioPublicacion: 0,
    autor: {
      id_autor: 0,
      nombre: '',
    },
    carrera: {
      id_carrera: 0,
      nombre: '',
    },
  };
  anios: number[] = [];
  anioSeleccionado: number = 0;

  autorBusqueda: string = '';
  carreraBusqueda: string = '';
  autores: Autor[] = [];
  carreras: Carrera[] = [];
  errorMessage: string = '';
  selectedFile: File | null = null;

  constructor(
    private http: HttpClient,
    private documentoService: DocumentoService,
    private autorService: AutorService,
    private carreraService: CarreraService) { }

  ngOnInit() {
    this.generarAnios();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }

  generarAnios() {
    const anioActual = new Date().getFullYear();
    for (let i = anioActual; i >= 1900; i--) {
      this.anios.push(i);
    }
  }

  guardar() {
    if (this.selectedFile) {
      this.documento.anioPublicacion = this.anioSeleccionado;
      this.documentoService.registrarDocumento(this.documento).subscribe(
        (response) => {
          console.log('Documento guardado', response);
        },
        (error) => {
          console.error('Error al guardar documento', error);
        }
      );
    }
  }

  buscarAutor() {
    this.autorService.buscarAutores(this.autorBusqueda).subscribe((autores) => {
      this.autores = autores;
    });
    console.log(this.autores)
  }

  buscarCarrera() {
    this.carreraService.buscarCarreras(this.carreraBusqueda).subscribe((carreras) => {
      this.carreras = carreras;
    });
  }

  crearAutor() {
    this.autorService.crearAutor(this.autorBusqueda).subscribe(
      (autor) => {
        this.autores.push(autor);
        this.documento.autor = autor;
        this.errorMessage = ''; // Limpia el mensaje de error si la creación es exitosa
      },
      (error) => {
        this.errorMessage = error; // Asigna el mensaje de error
        setTimeout(() => {
          this.errorMessage = ''; // Limpia el mensaje de error después de 10 segundos
        }, 3000); // 10000 milisegundos = 10 segundos
      }
    );
  }

  crearCarrera() {
    this.carreraService.crearCarrera(this.carreraBusqueda).subscribe((carrera) => {
      this.carreras.push(carrera);
      this.documento.carrera = carrera;
    });
  }

  seleccionarAutor(autor: Autor) {
    this.documento.autor = autor;
    this.autores = []; // Limpia la lista de resultados
  }

  seleccionarCarrera(carrera: Carrera) {
    this.documento.carrera = carrera;
    this.carreras = []; // Limpia la lista de resultados
  }

  autorExisteEnLista(): boolean {
    if (this.documento.autor && this.documento.autor.nombre === this.autorBusqueda) {
      return true;
    } else {
      return false;
    }
  }

  carreraExisteEnLista(): boolean {
   return this.documento.carrera && this.documento.carrera.nombre === this.carreraBusqueda;
  }
}