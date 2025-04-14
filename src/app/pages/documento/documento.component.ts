import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { Documento } from '../../models/Documento';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutorService } from '../../services/autor.service';
import { CarreraService } from '../../services/carrera.service';
import { Autor } from '../../models/Autor';
import { Carrera } from '../../models/Carrera';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-documento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './documento.component.html',
  styleUrl: './documento.component.css'
})
export class DocumentoComponent implements OnInit {
  documentoId: number = 0;
  documento: Documento = {
    id_documento: undefined,
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
  mostrarOpcionesA = false;
  mostrarOpcionesC = false;
  btnCrearAutor = false;
  btnCrearCarrera = false;

  autorBusqueda: string = '';
  carreraBusqueda: string = '';
  autores: Autor[] = [];
  carreras: Carrera[] = [];
  errorMessage: string = '';
  selectedFile: File | null = null;
  esEditar: Boolean = false;

  @ViewChild('inputAutorBusqueda') inputAutorBusqueda!: ElementRef;
  autorSeleccionado: Autor = {
    id_autor: 0,
    nombre: '',
  };

  @ViewChild('inputCarreraBusqueda') inputCarreraBusqueda!: ElementRef;
  carreraSeleccionado: Autor = {
    id_autor: 0,
    nombre: '',
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private documentoService: DocumentoService,
    private autorService: AutorService,
    private carreraService: CarreraService) { }


  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['documentoEditar']) {
        this.documentoId = JSON.parse(params['documentoEditar']);
        this.documentoService.buscarxId(this.documentoId).subscribe((documentoConsultado) => {
          this.documento = documentoConsultado;
          this.esEditar = true;
          this.anioSeleccionado = this.documento.anioPublicacion;
          this.carreraBusqueda = this.documento.carrera.nombre;
          this.autorBusqueda = this.documento.autor.nombre;
        })

      }
    });
    this.generarAnios();
    this.listarAutor();
    this.listarCarrera();
  }


  base64ToFile(base64String: string, filename: string): File {
    const arr = base64String.split(',');
    const match = arr[0].match(/:(.*?);/);
    const mime = match ? match[1] : 'application/octet-stream'; // Usar un valor predeterminado si no hay coincidencia

    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  listarAutor() {
    this.autorService.obtenerAutores().subscribe((autores) => {
      this.autores = autores;
      this.btnCrearAutor = false;
    });
  }

  generarAnios() {
    const anioActual = new Date().getFullYear();
    for (let i = anioActual; i >= 1900; i--) {
      this.anios.push(i);
    }
  }

  guardar() {
 
      if (this.selectedFile && this.documento.autor.id_autor && this.documento.carrera.id_carrera) {
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
        formData.append('titulo', this.documento.titulo);
        formData.append('resumen', this.documento.resumen);
        formData.append('anioPublicacion', this.anioSeleccionado.toString());
        formData.append('documentoId', this.documento.id_documento+"");
        formData.append('autorId', this.documento.autor.id_autor.toString());
        formData.append('carreraId', this.documento.carrera.id_carrera.toString());
        this.http.post('http://localhost:8080/api/documentos/crear', formData).subscribe(
          (response: any) => {
            Swal.fire({
              text: 'Documento Guardado Correctamente',
              icon: 'success',
            });
            console.log('Documento guardado');
            this.router.navigate(['/']);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 200) {
              Swal.fire({
                text: 'Documento Guardado Correctamente',
                icon: 'success',
              });
              this.router.navigate(['/']);
            } else {
              Swal.fire({
                text: 'Ocurrió un error al guardar: ' + error,
                icon: 'error',
              });
            }
          }
        );
      }
    
  }

  buscarAutor(buscarAutorr: string) {
    this.mostrarOpcionesA = true;
    if (buscarAutorr === "") {
      this.listarAutor(); // Lista todos los autores si el input está vacío
    } else {
      this.autorService.buscarAutores(buscarAutorr).subscribe((autores) => {
        this.autores = autores;
        this.btnCrearAutor = autores.length === 0; // Muestra el botón si no hay coincidencias
      });
    }
  }

  buscarCarrera(buscarCarrerar: string) {
    this.mostrarOpcionesC = true;
    if (buscarCarrerar === "") {
      this.listarCarrera(); // Lista todos los autores si el input está vacío
    } else {
      this.autorService.buscarAutores(buscarCarrerar).subscribe((carreras) => {
        this.carreras = carreras;
        this.btnCrearCarrera = carreras.length === 0; // Muestra el botón si no hay coincidencias
      });
    }
  }

  crearAutor(autornuevo: string) {
    this.autorService.crearAutor(autornuevo).subscribe(
      (autor) => {
        this.seleccionarAutor(autor); // Selecciona el autor creado
        this.listarAutor(); // Actualiza la lista de autores
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = error;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }

  crearCarrera(carreranuevo: string) {
    this.carreraService.crearCarrera(carreranuevo).subscribe(
      (carrera) => {
        this.seleccionarCarrera(carrera); // Selecciona el autor creado
        this.listarCarrera(); // Actualiza la lista de autores
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = error;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }

  seleccionarAutor(autor: any) {
    if (autor != null) {
      this.inputAutorBusqueda.nativeElement.value = autor.nombre;
      this.documento.autor = autor;
      this.autores = []; // Limpia la lista de autores
      this.mostrarOpcionesA = false; // Oculta las opciones
      this.btnCrearAutor = false; // Asegura que el botón "Crear" esté oculto
    } else {
      this.mostrarOpcionesA = false;
      this.inputAutorBusqueda.nativeElement.value = 'Seleccionar Autor';
      this.listarAutor();
    }
  }

  seleccionarCarrera(carrera: any) {
    if (carrera != null) {
      this.inputCarreraBusqueda.nativeElement.value = carrera.nombre;
      this.documento.carrera = carrera;
      this.carreras = []; // Limpia la lista de autores
      this.mostrarOpcionesC = false; // Oculta las opciones
      this.btnCrearCarrera = false; // Asegura que el botón "Crear" esté oculto
    } else {
      this.mostrarOpcionesC = false;
      this.listarCarrera()
      this.inputCarreraBusqueda.nativeElement.value = 'Seleccionar Carrera';
    }
  }

  listarCarrera() {
    this.carreraService.obtenerCarrera().subscribe((carreras) => {
      this.carreras = carreras;
      this.btnCrearCarrera = false;
    });
  }


}
