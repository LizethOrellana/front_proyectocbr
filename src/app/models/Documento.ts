import { Autor } from "./Autor";
import { Carrera } from "./Carrera";

export interface Documento {
    id_documento?: number;
    contenido?:File;
    titulo: string;
    resumen: string;
    anioPublicacion: number;
    autor:Autor
    carrera:Carrera
}