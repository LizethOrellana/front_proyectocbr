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
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-documento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './documento.component.html',
  styleUrl: './documento.component.css'
})
export class DocumentoComponent implements OnInit {
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

  autorBusqueda: string = '';
  carreraBusqueda: string = '';
  autores: Autor[] = [];
  carreras: Carrera[] = [];
  errorMessage: string = '';
  selectedFile: File | null = null;
  esEditar: Boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private documentoService: DocumentoService,
    private autorService: AutorService,
    private carreraService: CarreraService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['documento']) {
        try {
          this.documento = JSON.parse(params['documento']);
          this.esEditar = true;
          this.anioSeleccionado = this.documento.anioPublicacion;
          this.carreraBusqueda = this.documento.carrera.nombre;
          this.autorBusqueda = this.documento.autor.nombre;
        } catch (error) {
          console.error('Error al analizar JSON:', error);
        }
      }
    });

    console.log('Lo que llega:');
    console.log(this.documento);
    this.generarAnios();
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
    console.log(this.selectedFile)
  }

  generarAnios() {
    const anioActual = new Date().getFullYear();
    for (let i = anioActual; i >= 1900; i--) {
      this.anios.push(i);
    }
  }

  guardar() {
    if (this.esEditar == true) {
      this.editar()
    } else {
      if (this.selectedFile && this.documento.autor.id_autor && this.documento.carrera.id_carrera) {
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
        formData.append('titulo', this.documento.titulo);
        formData.append('resumen', this.documento.resumen);
        formData.append('anioPublicacion', this.anioSeleccionado.toString());
        formData.append('autorId', this.documento.autor.id_autor.toString());
        formData.append('carreraId', this.documento.carrera.id_carrera.toString());

        this.http.post('http://localhost:8080/api/documentos/crear', formData).subscribe(
          (response) => {
            console.log('Documento guardado', response);
          },
          (error) => {
            console.error('Error al guardar documento', error);
          }
        );
      }
    }
  }

  editar() {
    this.documento.anioPublicacion = this.anioSeleccionado;
    this.documentoService.editarDocumento(this.documento).subscribe((documento) => {
      console.log("Se edito el documento")
    })
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
