import { Component } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { Documento } from '../../models/Documento';
import { CommonModule} from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DocumentoService],
})
export class HomeComponent {
  documentos: Documento[] = [];
  

  constructor(private documentoService: DocumentoService,) { }
  ngOnInit(): void {
    console.log("Home")
    this.obtenerDocumentos() // Descomenta esta linea
  }

  obtenerDocumentos(){
    this.documentoService.obtenerDocumentos().subscribe((response: Documento[])=>{ // Cambia [Documento] a Documento[]
      this.documentos=response;
    })
  }
}
